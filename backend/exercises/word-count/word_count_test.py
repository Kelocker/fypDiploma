import sys
import os
import unittest
import io

script_dir = os.path.dirname(__file__)  
sys.path.append(script_dir)
from word_count import (
    count_words,
)

class WordCountTest(unittest.TestCase):
    def test_count_one_word(self):
        self.assertEqual(count_words("word"), {"word": 1})
        

    def test_count_one_of_each_word(self):
        self.assertEqual(count_words("one of each"), {"one": 1, "of": 1, "each": 1})

    def test_multiple_occurrences_of_a_word(self):
        self.assertEqual(
            count_words("one fish two fish red fish blue fish"),
            {"one": 1, "fish": 4, "two": 1, "red": 1, "blue": 1},
        )

    def test_handles_cramped_lists(self):
        self.assertEqual(count_words("one,two,three"), {"one": 1, "two": 1, "three": 1})

    def test_handles_expanded_lists(self):
        self.assertEqual(
            count_words("one,\ntwo,\nthree"), {"one": 1, "two": 1, "three": 1}
        )

    def test_ignore_punctuation(self):
        self.assertEqual(
            count_words("car: carpet as java: javascript!!&@$%^&"),
            {"car": 1, "carpet": 1, "as": 1, "java": 1, "javascript": 1},
        )

    def test_include_numbers(self):
        self.assertEqual(
            count_words("testing, 1, 2 testing"), {"testing": 2, "1": 1, "2": 1}
        )

    def test_normalize_case(self):
        self.assertEqual(count_words("go Go GO Stop stop"), {"go": 3, "stop": 2})

    def test_with_apostrophes(self):
        self.assertEqual(
            count_words("'First: don't laugh. Then: don't cry. You're getting it.'"),
            {
                "first": 1,
                "don't": 2,
                "laugh": 1,
                "then": 1,
                "cry": 1,
                "you're": 1,
                "getting": 1,
                "it": 1,
            },
        )

    def test_with_quotations(self):
        self.assertEqual(
            count_words("Joe can't tell between 'large' and large."),
            {"joe": 1, "can't": 1, "tell": 1, "between": 1, "large": 2, "and": 1},
        )

    def test_substrings_from_the_beginning(self):
        self.assertEqual(
            count_words("Joe can't tell between app, apple and a."),
            {
                "joe": 1,
                "can't": 1,
                "tell": 1,
                "between": 1,
                "app": 1,
                "apple": 1,
                "and": 1,
                "a": 1,
            },
        )

    def test_multiple_spaces_not_detected_as_a_word(self):
        self.assertEqual(
            count_words(" multiple   whitespaces"), {"multiple": 1, "whitespaces": 1}
        )

    def test_alternating_word_separators_not_detected_as_a_word(self):
        self.assertEqual(
            count_words(",\n,one,\n ,two \n 'three'"), {"one": 1, "two": 1, "three": 1}
        )

    def test_quotation_for_word_with_apostrophe(self):
        self.assertEqual(count_words("can, can't, 'can't'"), {"can": 1, "can't": 2})

    # Additional tests for this track

    def test_tabs(self):
        self.assertEqual(
            count_words(
                "rah rah ah ah ah	roma roma ma	ga ga oh la la	want your bad romance"
            ),
            {
                "rah": 2,
                "ah": 3,
                "roma": 2,
                "ma": 1,
                "ga": 2,
                "oh": 1,
                "la": 2,
                "want": 1,
                "your": 1,
                "bad": 1,
                "romance": 1,
            },
        )

    def test_non_alphanumeric(self):
        self.assertEqual(
            count_words("hey,my_spacebar_is_broken"),
            {"hey": 1, "my": 1, "spacebar": 1, "is": 1, "broken": 1},
        )

    def test_multiple_apostrophes_ignored(self):
        self.assertEqual(count_words("''hey''"), {"hey": 1})

if __name__ == '__main__':
    unittest.main()
# def format_final_results(result, output):
#     """Format and return the test results."""
#     results_summary = {
#         'total_tests': result.testsRun,
#         'failures': len(result.failures),
#         'errors': len(result.errors),
#         'passed': len(result.successes) 
#     }
#     detailed_results = {
#         'Failures': [f[0]._testMethodName for f in result.failures],
#         'Errors': [e[0]._testMethodName for e in result.errors],
#         'Passed': [s._testMethodName for s in result.successes]
#     }
#     return {
#         'summary': results_summary,
#         'details': detailed_results,
#         'output': output
#     }
# class CollectingTestResult(unittest.TextTestResult):
#     def __init__(self, stream, descriptions, verbosity):
#         super().__init__(stream, descriptions, verbosity)
#         self.successes = []

#     def addSuccess(self, test):
#         super().addSuccess(test)
#         self.successes.append(test)
# def execute_code(file_path):
#     code_from_db = fetch_code_from_db()
#     if not code_from_db:
#         return {'message': 'No code found in the database.'}

#     try:
#         exec(code_from_db, globals())

#         stream = io.StringIO()
#         runner = unittest.TextTestRunner(stream=stream, resultclass=CollectingTestResult, verbosity=2)
#         module_name = os.path.splitext(os.path.basename(file_path))[0]
#         suite = unittest.defaultTestLoader.loadTestsFromModule(__import__(module_name))
#         result = runner.run(suite)
#         return format_final_results(result, stream.getvalue())

#     except Exception as e:
#         return {'error': str(e)}

# # Example usage
# file_path = '../backend/exercises/word-count/word_count_test.py'
# results = execute_code(file_path)
# print(results)




# def fetch_code_from_db():
#     """Fetch the most recent code snippet from the database."""
#     with sqlite3.connect('db.sqlite3') as conn:
#         cursor = conn.cursor()
#         cursor.execute("SELECT code FROM api_codesnippet ORDER BY id DESC LIMIT 1")
#         row = cursor.fetchone()
#         return row[0] if row else None

# def run_tests():
#     """Run the tests after fetching code from the database."""
#     code_from_db = fetch_code_from_db()
#     if not code_from_db:
#         return {'message': 'No code found in the database.'}

#     exec(code_from_db, globals())

#     stream = io.StringIO()
#     runner = unittest.TextTestRunner(stream=stream, resultclass=CollectingTestResult, verbosity=2)
#     suite = unittest.defaultTestLoader.loadTestsFromTestCase(WordCountTest)
#     result = runner.run(suite)
#     return format_final_results(result, stream.getvalue())



# if __name__ == "__main__":
#     results = run_tests()
#     print(results)
