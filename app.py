from flask import Flask, request, jsonify, render_template
from functools import wraps
import subprocess
import time

app = Flask(__name__, static_folder="static", template_folder="static")

# `/` にアクセスしたら `index.html` を返す
@app.route("/")
def home():
    return render_template("index.html")

# スクリプト辞書（登録されたスクリプト一覧）
scripts = {
    'hello': {'path': 'scripts/hello.sh', 'description': 'Hello World script'},
    'status': {'path': 'scripts/status.sh', 'description': 'System status check'}
}

# 実行ログ
execution_logs = []

# Basic認証の実装
def check_auth(username, password):
    return username == 'admin' and password == 'secret'

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/scripts', methods=['GET'])
@requires_auth
def get_scripts():
    return jsonify(scripts)

@app.route('/api/run/<script_id>', methods=['POST'])
@requires_auth
def run_script(script_id):
    if script_id not in scripts:
        return jsonify({'error': 'Script not found'}), 404
    
    try:
        result = subprocess.run(['bash', scripts[script_id]['path']], 
                                capture_output=True, text=True)
        log_entry = {
            'timestamp': time.time(),
            'script_id': script_id,
            'output': result.stdout,
            'error': result.stderr,
            'status': result.returncode
        }
        execution_logs.append(log_entry)
        return jsonify(log_entry)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/logs', methods=['GET'])
@requires_auth
def get_logs():
    return jsonify(execution_logs)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
