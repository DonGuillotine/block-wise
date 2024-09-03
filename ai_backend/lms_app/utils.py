import cohere
from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
import PyPDF2
import json
import re
from io import BytesIO
from django.conf import settings
from .models import Book, BookChunk

def get_pinecone_client():
    return Pinecone(api_key=settings.PINECONE_API_KEY)

def get_cohere_client():
    return cohere.Client(settings.COHERE_API_KEY)

def initialize_pinecone_index(index_name, dimension):
    pc = get_pinecone_client()
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=dimension,
            metric="cosine",
            spec=ServerlessSpec(
                cloud='aws',
                region=settings.PINECONE_ENVIRONMENT
            )
        )
    return pc.Index(index_name)

def preprocess_and_embed_book(book):
    co = get_cohere_client()
    pc = get_pinecone_client()
    index_name = "books-index"
    dimension = 1024
    batch_size = 100  # Adjust this value as needed

    # Initialize Pinecone index if it doesn't exist
    index = initialize_pinecone_index(index_name, dimension)

    # Preprocess the PDF content
    chunks = preprocess_pdf(book.file_path)
    
    # Generate embeddings using the new model and input_type
    embeddings = co.embed(
        texts=chunks, 
        model='embed-english-v3.0',
        input_type="search_document"
    ).embeddings
    
    # Prepare vectors for upserting
    vectors = [
        {
            "id": f"{book.id}-{i}",
            "values": embedding,
            "metadata": {"chunk_id": i, "book_id": book.id}
        }
        for i, embedding in enumerate(embeddings)
    ]
    try:
        # Upsert vectors to Pinecone in batches
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i+batch_size]
            index.upsert(vectors=batch)
    except Exception as e:
        print(f"Error upserting vectors for book {book.id}: {str(e)}")
        raise
    
    # Store chunks in the database
    for i, chunk in enumerate(chunks):
        book.chunks.create(chunk_id=i, content=chunk)
    
    # Update the book's embedding_id
    book.embedding_id = f"{book.id}"
    book.save()

def preprocess_pdf(file_path):
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
    
    # Clean the text
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)
    text = text.lower()
    
    # Split into smaller chunks
    chunk_size = 500  # Reduced from 1000
    overlap = 100  # Reduced from 200
    chunks = []
    for i in range(0, len(text), chunk_size - overlap):
        chunk = text[i:i + chunk_size]
        chunks.append(chunk)
    
    return chunks


def get_relevant_text_chunks(book_id, chunk_ids):
    book_chunks = BookChunk.objects.filter(book_id=book_id, chunk_id__in=chunk_ids)
    return [chunk.content for chunk in book_chunks]

def generate_course_outline(user_data):
    co = get_cohere_client()
    
    prompt = f"""
    Create a 3-chapter course outline based on the following user data:
    Background level: {user_data['background_level']}
    Learning goals: {user_data['learning_goals']}
    Available time per week: {user_data['available_time_per_week']} hours
    Specific interests: {user_data['specific_interests']}
    Previous experience: {user_data['previous_experience']}
    Preferred pace: {user_data['preferred_pace']}
    Language preference: {user_data['language_preference']}

    The course outline should include:
    1. Course title
    2. Course description
    3. Three chapter titles with brief descriptions

    Format the output as JSON without any markdown code block markers.
    """

    response = co.generate(
        model='command-nightly',
        prompt=prompt,
        max_tokens=500,
        temperature=0.7,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )
    print(f"The original response here: {response.generations[0].text}")

    # Parse the JSON response
    try:
        course_outline = json.loads(response.generations[0].text.strip())
        print("Successfully parsed JSON:")
        print(json.dumps(course_outline, indent=2))
        return course_outline  # Return the parsed JSON
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON: {e}")

def generate_chapter_content(chapter_title, chapter_description, book_id):
    co = get_cohere_client()
    pc = get_pinecone_client()
    index = pc.Index("books-index")
    
    # Generate embedding for the chapter title and description
    query_embedding = co.embed(
        texts=[f"{chapter_title} {chapter_description}"],
        model='embed-english-v3.0',
        input_type="search_query"
    ).embeddings[0]
    
    # Query Pinecone for relevant content
    query_results = index.query(
        vector=query_embedding,
        top_k=5,
        filter={"book_id": book_id},
        include_metadata=True
    )
    
    relevant_chunks = [match['metadata']['chunk_id'] for match in query_results['matches']]
    
    # Retrieve the actual text chunks
    book = Book.objects.get(id=book_id)
    relevant_text = " ".join([book.chunks.get(chunk_id=chunk_id).content for chunk_id in relevant_chunks])
    
    prompt = f"""
    Generate detailed content for a book chapter based on the following information:
    Chapter title: {chapter_title}
    Chapter description: {chapter_description}
    
    Use the following relevant text from the book as a reference:
    {relevant_text}
    
    The chapter content should be comprehensive and well-structured.
    """

    response = co.generate(
        model='command-nightly',
        prompt=prompt,
        max_tokens=2000,
        temperature=0.7,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )

    return response.generations[0].text

def validate_and_correct_quiz_json(json_string):
    try:
        quiz_data = json.loads(json_string)

        if not isinstance(quiz_data, list):
            raise ValueError("Quiz data is not a list")

        corrected_quiz_data = []
        for i, question in enumerate(quiz_data[:5]):  
            corrected_question = {
                "question": question.get("question", f"Question {i+1}"),
                "options": [],
                "correct_answer": ""
            }
            
            options = question.get("options", [])
            for j, option in enumerate(options[:4]):  
                letter = chr(65 + j)  
                corrected_option = re.sub(r'^[A-D]\.\s*', '', option)
                corrected_question["options"].append(f"{letter}. {corrected_option}")
         
            while len(corrected_question["options"]) < 4:
                letter = chr(65 + len(corrected_question["options"]))
                corrected_question["options"].append(f"{letter}. Option {letter}")

            correct_answer = question.get("correct_answer", "A")
            if correct_answer not in ["A", "B", "C", "D"]:
                correct_answer = "A"
            corrected_question["correct_answer"] = correct_answer
            
            corrected_quiz_data.append(corrected_question)

        while len(corrected_quiz_data) < 5:
            dummy_question = {
                "question": f"Dummy Question {len(corrected_quiz_data) + 1}",
                "options": [
                    "A. Option A",
                    "B. Option B",
                    "C. Option C",
                    "D. Option D"
                ],
                "correct_answer": "A"
            }
            corrected_quiz_data.append(dummy_question)
        
        return json.dumps(corrected_quiz_data, indent=2)
    except json.JSONDecodeError:
        print("Shit went down Lads")
        # return json.dumps([
        #     {
        #         "question": f"Default Question {i+1}",
        #         "options": [
        #             "A. Option A",
        #             "B. Option B",
        #             "C. Option C",
        #             "D. Option D"
        #         ],
        #         "correct_answer": "A"
        #     } for i in range(5)
        # ], indent=2)

def generate_quiz(chapter_content):
    co = get_cohere_client()
    
    prompt = f"""
    Generate a quiz based on the following chapter content:
    {chapter_content}
    
    Create exactly 5 multiple-choice questions with 4 options each. Include the correct answer.
    Format the output as a valid JSON array with the following structure:
    [
        {{
            "question": "Question text here?",
            "options": [
                "A. First option",
                "B. Second option",
                "C. Third option",
                "D. Fourth option"
            ],
            "correct_answer": "A"
        }},
        // ... (4 more questions in the same format)
    ]
    
    Ensure that:
    1. There are exactly 5 questions.
    2. Each question has exactly 4 options.
    3. Options are labeled A, B, C, and D.
    4. The correct_answer field contains only A, B, C, or D.
    5. The output is a valid JSON array.
    """

    response = co.generate(
        model='command-nightly',
        prompt=prompt,
        max_tokens=1500,
        temperature=0.7,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE'
    )

    validated_quiz_json = validate_and_correct_quiz_json(response.generations[0].text)
    
    return json.loads(validated_quiz_json)