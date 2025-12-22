from flask import Flask, request, jsonify, session, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os

app = Flask(__name__, static_folder='static')
app.secret_key = 'valorantfanpage_secret_key'

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            gender TEXT,
            rating INTEGER,
            terms BOOLEAN
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Helper to serve static files with relative path support
@app.route('/CSS/<path:path>')
def send_css(path):
    return send_from_directory('static/CSS', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('static/js', path)

@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('static/assets', path)

# HTML Pages
@app.route('/')
def index():
    return send_from_directory('static/html', 'index.html')

@app.route('/<path:filename>')
def serve_html(filename):
    if filename.endswith('.html'):
        return send_from_directory('static/html', filename)
    return send_from_directory('static', filename)

# API Endpoints
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    gender = data.get('gender')
    rating = data.get('rating')
    terms = data.get('terms')

    if not name or not email or not password:
        return jsonify({'error': 'Faltan datos requeridos'}), 400

    hashed_pw = generate_password_hash(password)

    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (name, email, password, gender, rating, terms) VALUES (?, ?, ?, ?, ?, ?)',
                     (name, email, hashed_pw, gender, rating, terms))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({'error': 'El correo ya está registrado'}), 409

    conn.close()

    # Auto login after registration
    session['user'] = email
    return jsonify({'message': 'Usuario registrado exitosamente'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if user and check_password_hash(user['password'], password):
        session['user'] = user['email']
        return jsonify({'message': 'Login exitoso'})

    return jsonify({'error': 'Credenciales inválidas'}), 401

@app.route('/api/user', methods=['GET'])
def get_user():
    if 'user' in session:
        return jsonify({'user': session['user']})
    return jsonify({'user': None})

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logout exitoso'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
