# Proyecto Web Valorant

## Hospedado en phytonanywhere
Link: https://leoismael.pythonanywhere.com/

## Descripción
Este proyecto es una aplicación web informativa basada en el videojuego **Valorant**, desarrollada utilizando **Python** con un servidor **WSGI**. La aplicación permite a los usuarios registrarse en la plataforma, visualizar información de los agentes del juego y enviar mensajes mediante un formulario de contacto. Los datos de los usuarios se almacenan en bases de datos **MySQL** y **SQLite**, permitiendo la persistencia de la información.

## 🛠️ Tecnologías utilizadas
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python
- **Servidor:** WSGI
- **Base de datos:** MySQL y SQLite
- **Control de versiones:** Git y GitHub

---

## ⚙️ Requisitos previos
Antes de ejecutar el proyecto se debe contar con:
- Python 3.x
- Navegador web moderno
- MySQL (opcional según configuración)
- SQLite (incluido en Python)

---

## ▶️ Instrucciones de ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Leo-Bv-1/Proyecto-Individual.git
```
### 2️⃣ Configurar la base de datos

Para SQLite: la base de datos se crea automáticamente al ejecutar el servidor.

Para MySQL:

- Crear una base de datos usa este codigo:
```
CREATE DATABASE IF NOT EXISTS Proyecto;
USE Proyecto;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    gender VARCHAR(50),
    rating INT,
    terms TINYINT(1)
);

CREATE TABLE sessions (
    session_id VARCHAR(36) PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```
### 3️⃣ Ejecutar el servidor 
Ejecuta el archivo server.py en tu computadora.

### 4️⃣ Acceder a la pagina

Abrir el navegador e ingresar a:

http://localhost:8000

Listo ahí ya puede probar todas las funcionalidades de la página.


### ✍️ Autor
Leo

Proyecto Individual – Introducción al Desarrollo Web