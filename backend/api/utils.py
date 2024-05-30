import subprocess

def run_test_script(script_path):
    try:
        result = subprocess.run(['python', script_path], capture_output=True, text=True)
        return {
            'success': result.returncode == 0,
            'output': result.stdout,
            'error': result.stderr
        }
    except Exception as e:
        return {'error': str(e)}
