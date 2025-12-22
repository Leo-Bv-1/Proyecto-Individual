document.addEventListener('DOMContentLoaded', () => {
    checkSession();

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    // Bind logout to any button with id 'logout-btn' or class 'logout-action'
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.id === 'logout-btn' || e.target.classList.contains('logout-action'))) {
            e.preventDefault();
            logoutUser();
        }
    });
});

async function checkSession() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        const user = data.user;

        const hideIfLoggedIn = document.querySelectorAll('.auth-hide');
        const showIfLoggedIn = document.querySelectorAll('.auth-show');

        if (user) {
            // User is logged in
            hideIfLoggedIn.forEach(el => el.style.display = 'none');
            showIfLoggedIn.forEach(el => el.style.display = 'inline-block'); // or block/flex depending on context
        } else {
            // User is not logged in
            hideIfLoggedIn.forEach(el => el.style.display = 'inline-block');
            showIfLoggedIn.forEach(el => el.style.display = 'none');
        }
    } catch (error) {
        console.error('Error checking session:', error);
    }
}

async function registerUser(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Convert FormData to JSON. Note: Assumes standard inputs.
    // For Radio buttons, FormData handles getting the checked value automatically.

    const data = {
        name: formData.get('Nombre Completo'),
        email: formData.get('correo'),
        password: formData.get('password'),
        gender: formData.get('Género'),
        rating: formData.get('reseña'),
        terms: formData.get('terminos') === 'on' // Checkbox
    };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registro exitoso!');
            window.location.href = 'index.html'; // Redirect to home
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('Error de conexión');
    }
}

async function loginUser(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login exitoso');
            window.location.href = 'index.html';
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error de conexión');
    }
}

async function logoutUser() {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.reload();
    } catch (error) {
        console.error('Error logging out:', error);
    }
}
