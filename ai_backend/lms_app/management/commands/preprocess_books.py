import os
from django.core.management.base import BaseCommand
from django.conf import settings
from lms_app.models import Book
from lms_app.utils import preprocess_and_embed_book

class Command(BaseCommand):
    help = 'Preprocess books, generate embeddings, and upsert to Pinecone'

    def handle(self, *args, **options):
        books_dir = os.path.join(settings.BASE_DIR, 'lms_app', 'books')

        for filename in os.listdir(books_dir):
            if filename.endswith('.pdf'):
                file_path = os.path.join(books_dir, filename)
                
                book, created = Book.objects.get_or_create(
                    file_name=filename,
                    defaults={'title': filename.replace('.pdf', ''), 'author': 'Unknown'}
                )

                if created or not book.embedding_id:
                    self.stdout.write(f"Processing {filename}...")
                    try:
                        preprocess_and_embed_book(book)
                        self.stdout.write(self.style.SUCCESS(f"Successfully processed {filename}"))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing {filename}: {str(e)}"))
                else:
                    self.stdout.write(f"Skipping {filename} (already processed)")

        self.stdout.write(self.style.SUCCESS("All books processed successfully"))