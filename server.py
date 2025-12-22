import os
import json
import sqlite3
import mimetypes
import http.cookies
import uuid
from wsgiref.simple_server import make_server
from werkzeug.security import generate_password_hash, check_password_hash

# Configuration
DB_FILE = 'database.db'
STATIC_DIR = 'static'
PORT = 5000

# Initialize Database
def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
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
    c.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            session_id TEXT PRIMARY KEY,
            email TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# Helper functions
def get_request_body(environ):
    try:
        request_body_size = int(environ.get('CONTENT_LENGTH', 0))
    except (ValueError):
        request_body_size = 0
    request_body = environ['wsgi.input'].read(request_body_size)
    return request_body

def parse_json_body(environ):
    body = get_request_body(environ)
    if not body:
        return {}
    try:
        return json.loads(body.decode('utf-8'))
    except json.JSONDecodeError:
        return {}

def get_session(environ):
    if 'HTTP_COOKIE' not in environ:
        return None
    cookie = http.cookies.SimpleCookie(environ['HTTP_COOKIE'])
    if 'session_id' not in cookie:
        return None
    session_id = cookie['session_id'].value

    conn = get_db_connection()
    row = conn.execute('SELECT email FROM sessions WHERE session_id = ?', (session_id,)).fetchone()
    conn.close()

    if row:
        return row['email']
    return None

def create_session(email):
    session_id = str(uuid.uuid4())
    conn = get_db_connection()
    conn.execute('INSERT INTO sessions (session_id, email) VALUES (?, ?)', (session_id, email))
    conn.commit()
    conn.close()
    return session_id

def delete_session(environ):
    if 'HTTP_COOKIE' not in environ:
        return
    cookie = http.cookies.SimpleCookie(environ['HTTP_COOKIE'])
    if 'session_id' in cookie:
        session_id = cookie['session_id'].value
        conn = get_db_connection()
        conn.execute('DELETE FROM sessions WHERE session_id = ?', (session_id,))
        conn.commit()
        conn.close()

# Handlers
def handle_static(environ, start_response):
    path = environ.get('PATH_INFO', '').lstrip('/')
    if not path or path == '':
        path = 'html/index.html'

    # If path is just a filename (like 'index.html') or points to html dir, serve it.
    # The previous structure had html files in static/html, css in static/CSS, etc.
    # The frontend requests might be like "/index.html" or "/CSS/styles.css".

    # Try to resolve the file path inside STATIC_DIR
    # We need to handle the case where the browser asks for /index.html and it's physically at static/html/index.html
    # But checking the file structure:
    # static/html/index.html
    # static/CSS/...
    # static/js/...

    # Simple mapping logic:
    safe_static_dir = os.path.abspath(STATIC_DIR)
    full_path = os.path.abspath(os.path.join(STATIC_DIR, path))

    # Security check: Ensure the resolved path starts with the static directory
    if not full_path.startswith(safe_static_dir):
        start_response('403 Forbidden', [('Content-Type', 'text/plain')])
        return [b'Forbidden']

    # If not found, check if it's an HTML file at root level request, map to static/html/
    if not os.path.exists(full_path):
        if path.endswith('.html') or path == '':
             # Re-construct safely
             potential_html_path = os.path.abspath(os.path.join(STATIC_DIR, 'html', path))
             if potential_html_path.startswith(safe_static_dir) and os.path.exists(potential_html_path):
                 full_path = potential_html_path

    # Check again
    if not os.path.exists(full_path) or not os.path.isfile(full_path):
        start_response('404 Not Found', [('Content-Type', 'text/plain')])
        return [b'Not Found']

    mime_type, _ = mimetypes.guess_type(full_path)
    if mime_type is None:
        mime_type = 'application/octet-stream'

    start_response('200 OK', [('Content-Type', mime_type)])
    with open(full_path, 'rb') as f:
        return [f.read()]

def handle_register(environ, start_response):
    if environ['REQUEST_METHOD'] != 'POST':
        start_response('405 Method Not Allowed', [('Content-Type', 'application/json')])
        return [json.dumps({'error': 'Method not allowed'}).encode('utf-8')]

    data = parse_json_body(environ)
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    gender = data.get('gender')
    rating = data.get('rating')
    terms = data.get('terms')

    if not name or not email or not password:
        start_response('400 Bad Request', [('Content-Type', 'application/json')])
        return [json.dumps({'error': 'Faltan datos requeridos'}).encode('utf-8')]

    hashed_pw = generate_password_hash(password)

    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (name, email, password, gender, rating, terms) VALUES (?, ?, ?, ?, ?, ?)',
                     (name, email, hashed_pw, gender, rating, terms))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        start_response('409 Conflict', [('Content-Type', 'application/json')])
        return [json.dumps({'error': 'El correo ya está registrado'}).encode('utf-8')]

    conn.close()

    # Auto login
    session_id = create_session(email)
    cookie = http.cookies.SimpleCookie()
    cookie['session_id'] = session_id
    cookie['session_id']['path'] = '/'
    # You might want HttpOnly, etc.

    headers = [('Content-Type', 'application/json'), ('Set-Cookie', cookie.output(header='').strip())]
    start_response('200 OK', headers)
    return [json.dumps({'message': 'Usuario registrado exitosamente'}).encode('utf-8')]

def handle_login(environ, start_response):
    if environ['REQUEST_METHOD'] != 'POST':
        start_response('405 Method Not Allowed', [('Content-Type', 'application/json')])
        return [json.dumps({'error': 'Method not allowed'}).encode('utf-8')]

    data = parse_json_body(environ)
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if user and check_password_hash(user['password'], password):
        session_id = create_session(email)
        cookie = http.cookies.SimpleCookie()
        cookie['session_id'] = session_id
        cookie['session_id']['path'] = '/'

        headers = [('Content-Type', 'application/json'), ('Set-Cookie', cookie.output(header='').strip())]
        start_response('200 OK', headers)
        return [json.dumps({'message': 'Login exitoso'}).encode('utf-8')]

    start_response('401 Unauthorized', [('Content-Type', 'application/json')])
    return [json.dumps({'error': 'Credenciales inválidas'}).encode('utf-8')]

def handle_user(environ, start_response):
    email = get_session(environ)
    start_response('200 OK', [('Content-Type', 'application/json')])
    return [json.dumps({'user': email}).encode('utf-8')]

def handle_logout(environ, start_response):
    if environ['REQUEST_METHOD'] == 'POST':
        delete_session(environ)

    # Clear cookie
    cookie = http.cookies.SimpleCookie()
    cookie['session_id'] = ''
    cookie['session_id']['path'] = '/'
    cookie['session_id']['expires'] = 'Thu, 01 Jan 1970 00:00:00 GMT'

    headers = [('Content-Type', 'application/json'), ('Set-Cookie', cookie.output(header='').strip())]
    start_response('200 OK', headers)
    return [json.dumps({'message': 'Logout exitoso'}).encode('utf-8')]

def application(environ, start_response):
    path = environ.get('PATH_INFO', '')

    if path.startswith('/api/register'):
        return handle_register(environ, start_response)
    elif path.startswith('/api/login'):
        return handle_login(environ, start_response)
    elif path.startswith('/api/user'):
        return handle_user(environ, start_response)
    elif path.startswith('/api/logout'):
        return handle_logout(environ, start_response)
    else:
        return handle_static(environ, start_response)

if __name__ == '__main__':
    print(f"Serving on port {PORT}...")
    httpd = make_server('0.0.0.0', PORT, application)
    httpd.serve_forever()
