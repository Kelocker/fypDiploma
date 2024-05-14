
import sqlite3
def count_words(sentence):
    pass
    
def fetch_code_from_db():
    """Fetch the most recent code snippet from the database."""
    with sqlite3.connect('db.sqlite3') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT code FROM api_codesnippet ORDER BY id DESC LIMIT 1")
        row = cursor.fetchone()
        return row[0] if row else None

