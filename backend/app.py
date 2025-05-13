from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def health():
    return jsonify({'status': 'ok'})

@app.route('/echo', methods=['POST'])
def echo():
    data = request.get_json()
    return jsonify({'you_sent': data})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
 