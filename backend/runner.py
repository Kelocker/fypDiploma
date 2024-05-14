import unittest
import sqlite3
import logging
import io
import sys
import inspect
import os
from collections import Counter
import re

sys.path.append(os.path.join(os.path.dirname(__file__), 'exercises', 'word-count'))
from word_count_test import WordCountTest
from word_count import fetch_code_from_db


class CollectingTestResult(unittest.TextTestResult):
    def __init__(self, stream, descriptions, verbosity):
        super().__init__(stream, descriptions, verbosity)
        self.successes = []

    def addSuccess(self, test):
        super().addSuccess(test)
        self.successes.append(test)

    def startTest(self, test):
        super().startTest(test)

    def get_test_code(self, test):
        """Retrieve and return the code of the test function."""
        test_method = getattr(test, test._testMethodName)
        return inspect.getsource(test_method)

def run_tests():
    code_from_db = fetch_code_from_db()
    print(code_from_db)
    if not code_from_db:
        return {'message': 'No code found in the database.'}

    exec(code_from_db, globals())

    result, output = execute_tests()
    test_cases = extract_test_results(result)
    return format_final_results(test_cases, output, result)

def execute_tests():
    stream = io.StringIO()
    runner = unittest.TextTestRunner(stream=stream, resultclass=CollectingTestResult, verbosity=2)
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(WordCountTest)
    result = runner.run(suite)
    return result, stream.getvalue()

# def execute_tests():
#     stream = io.StringIO()
#     runner = unittest.TextTestRunner(stream=stream, resultclass=CollectingTestResult, verbosity=2)
#     return runner.run(TestRunner.test_suite())
    
def extract_test_results(result):
    test_cases = []
    for test in result.successes:
        test_cases.append({
            'name': test._testMethodName,
            'status': 'Passed',
            'code': get_test_code(test)
        })
    for test, err in result.failures:
        process_failed_or_error_test(test_cases, test, err, 'Failed')
    return test_cases

def process_failed_or_error_test(test_cases, test, message, status):
    """Add or update a test case with failure information."""
    name = test._testMethodName
    # Check if the test already exists in the list
    test_case = next((tc for tc in test_cases if tc['name'] == name), None)
    if test_case:
        # If it exists, update it (only if it's not already marked as failed)
        test_case['status'] = status
        test_case['message'] = message
    else:
        # If it does not exist, add it
        test_cases.append({
            'name': name,
            'status': status,
            'message': message,
            'code': get_test_code(test)
        })
def get_test_code(test):
    """Retrieve the source code of the test method."""
    test_method = getattr(test, test._testMethodName)
    return inspect.getsource(test_method)

def format_final_results(test_cases, output, result):
    return {
        'message': 'Fetched code and executed successfully.',
        'output': output,
        'results': {
            'total_tests': result.testsRun,
            'failures': len(result.failures),
            'errors': len(result.errors),
            'skipped': len(result.skipped),
            'successful': result.wasSuccessful(),
            'test_cases': test_cases
        }
    }

if __name__ == '__main__':
    results = run_tests()
    # print(results)
