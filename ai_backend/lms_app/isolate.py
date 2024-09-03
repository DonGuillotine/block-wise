import cohere
import json
from django.conf import settings

def get_cohere_client():
    return cohere.Client("")

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

user_data = {
    'background_level': 'Beginner',
    'learning_goals': 'Bitcoin Architecture',
    'available_time_per_week': 3,
    'specific_interests': 'The Bitcoin Architecture',
    'previous_experience': 'No experience',
    'preferred_pace': 'Fast-paced',
    'language_preference': 'English',
}

result = generate_course_outline(user_data)
print("\nFinal result:")
print(json.dumps(result, indent=2))