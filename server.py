import os
import mimetypes
import sqlite3
import uuid
import sys
import urllib.parse
from http.cookies import SimpleCookie

# import mysql.connector # Uncomment for MySQL

from wsgiref.simple_server import make_server

# Configuration
HOST = 'localhost'
PORT = 8000
STATIC_DIR = 'static'
DB_TYPE = 'sqlite' # Change to 'mysql' for MySQL

# --- Database Logic ---

def get_db_connection():
    if DB_TYPE == 'sqlite':
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        return conn
    elif DB_TYPE == 'mysql':
        # Replace with your MySQL configuration
        # return mysql.connector.connect(
        #     host="localhost",
        #     user="yourusername",
        #     password="yourpassword",
        #     database="yourdatabase"
        # )
        pass
    raise Exception("Invalid DB_TYPE")

def init_db():
    if DB_TYPE == 'sqlite':
        conn = get_db_connection()
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                gender TEXT,
                rating INTEGER,
                terms INTEGER
            )
        ''')
        c.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                session_id TEXT PRIMARY KEY,
                user_id INTEGER,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        ''')
        conn.commit()
        conn.close()
    elif DB_TYPE == 'mysql':
        # MySQL initialization logic would go here
        pass

def save_user(user_data):
    conn = get_db_connection()
    c = conn.cursor()
    try:
        if DB_TYPE == 'sqlite':
            c.execute('''
                INSERT INTO users (full_name, email, gender, rating, terms)
                VALUES (?, ?, ?, ?, ?)
            ''', (user_data['full_name'], user_data['email'], user_data['gender'], user_data['rating'], user_data['terms']))
            user_id = c.lastrowid
        elif DB_TYPE == 'mysql':
            pass
        conn.commit()
        return user_id
    except sqlite3.IntegrityError:
        return None # User likely already exists
    finally:
        conn.close()

def create_session(user_id):
    session_id = str(uuid.uuid4())
    conn = get_db_connection()
    c = conn.cursor()
    if DB_TYPE == 'sqlite':
        c.execute('INSERT INTO sessions (session_id, user_id) VALUES (?, ?)', (session_id, user_id))
    elif DB_TYPE == 'mysql':
        pass
    conn.commit()
    conn.close()
    return session_id

def get_session(session_id):
    conn = get_db_connection()
    c = conn.cursor()
    row = None
    if DB_TYPE == 'sqlite':
        c.execute('SELECT * FROM sessions WHERE session_id = ?', (session_id,))
        row = c.fetchone()
    elif DB_TYPE == 'mysql':
        pass
    conn.close()
    if row:
        return dict(row)
    return None

def get_user_by_id(user_id):
    conn = get_db_connection()
    c = conn.cursor()
    row = None
    if DB_TYPE == 'sqlite':
        c.execute('SELECT * FROM users WHERE id = ?', (user_id,))
        row = c.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

# --- Server Logic ---

def get_content_type(filepath):
    return mimetypes.guess_type(filepath)[0] or 'application/octet-stream'

def parse_post_data(environ):
    try:
        request_body_size = int(environ.get('CONTENT_LENGTH', 0))
    except (ValueError):
        request_body_size = 0
    request_body = environ['wsgi.input'].read(request_body_size)
    return urllib.parse.parse_qs(request_body.decode('utf-8'))

def handle_register(environ, start_response):
    post_data = parse_post_data(environ)

    # Extract fields
    full_name = post_data.get('Nombre Completo', [''])[0]
    email = post_data.get('correo', [''])[0]
    gender = post_data.get('Género', [''])[0]
    rating = post_data.get('reseña', ['0'])[0]
    terms = 1 if 'terminos' in post_data else 0

    if not full_name or not email:
        start_response('400 Bad Request', [('Content-type', 'text/plain')])
        return [b'Missing required fields']

    user_data = {
        'full_name': full_name,
        'email': email,
        'gender': gender,
        'rating': int(rating),
        'terms': terms
    }

    user_id = save_user(user_data)

    if user_id:
        session_id = create_session(user_id)
        cookie = SimpleCookie()
        cookie['session_id'] = session_id
        cookie['session_id']['path'] = '/'
        cookie['session_id']['httponly'] = True

        # Construct header list
        headers = [
            ('Location', '/index.html'),
            ('Content-type', 'text/plain')
        ]
        # Add cookie header
        headers.append(('Set-Cookie', cookie.output(header='').strip()))

        start_response('303 See Other', headers)
        return [b'Registered successfully']
    else:
        # User might already exist
        start_response('409 Conflict', [('Content-type', 'text/plain')])
        return [b'User already registered']

def serve_static(environ, start_response):
    path = environ.get('PATH_INFO', '/')

    if path == '/':
        path = '/index.html'

    # Check for session
    cookie_header = environ.get('HTTP_COOKIE')
    is_logged_in = False
    if cookie_header:
        cookie = SimpleCookie(cookie_header)
        if 'session_id' in cookie:
            session_id = cookie['session_id'].value
            session = get_session(session_id)
            if session:
                is_logged_in = True

    # Resolve file path
    filepath = os.path.join(STATIC_DIR, path.lstrip('/'))

    if not os.path.exists(filepath) and path.endswith('.html'):
        html_path = os.path.join(STATIC_DIR, 'html', os.path.basename(path))
        if os.path.exists(html_path):
            filepath = html_path

    # Security check
    abs_static = os.path.abspath(STATIC_DIR)
    abs_filepath = os.path.abspath(filepath)
    if not abs_filepath.startswith(abs_static):
        start_response('403 Forbidden', [('Content-type', 'text/plain')])
        return [b'403 Forbidden']

    if os.path.exists(filepath) and os.path.isfile(filepath):
        content_type = get_content_type(filepath)
        start_response('200 OK', [('Content-type', content_type)])

        if path == '/index.html' and is_logged_in and content_type == 'text/html':
             with open(filepath, 'r', encoding='utf-8') as f:
                 content = f.read()
                 # Remove or replace the registration button
                 # <a href="registro.html" class="boton">Registrarse</a>
                 content = content.replace('<a href="registro.html" class="boton">Registrarse</a>', '<!-- Registered -->')
                 return [content.encode('utf-8')]

        with open(filepath, 'rb') as f:
            return [f.read()]
    else:
        start_response('404 Not Found', [('Content-type', 'text/plain')])
        return [b'404 Not Found']

def application(environ, start_response):
    path = environ.get('PATH_INFO', '/')
    method = environ.get('REQUEST_METHOD')

    if path == '/register' and method == 'POST':
        return handle_register(environ, start_response)

    return serve_static(environ, start_response)

if __name__ == '__main__':
    # Initialize DB
    init_db()

    with make_server(HOST, PORT, application) as httpd:
        print(f"Serving on port {PORT}...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
