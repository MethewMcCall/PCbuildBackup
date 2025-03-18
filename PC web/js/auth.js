// Updated auth.js - Authentication Fixes

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

document.addEventListener('DOMContentLoaded', () => {
    redirectIfAuthenticated();
    updateAuthLinks();
});

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function register() {
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase(); // Case insensitive email
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase() || u.email === email)) {
        alert('Username or Email already exists.');
        return;
    }

    const hashedPassword = await hashPassword(password);
    users.push({ username, email, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Redirecting to login.');
    window.location.href = 'login.html';
}

// Updated auth.js - Redirect to Profile After Login

async function login() {
    const usernameOrEmail = document.getElementById('login-username').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    
    if (!usernameOrEmail || !password) {
        alert('Both fields are required.');
        return;
    }

    const hashedPassword = await hashPassword(password);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => 
        (u.username.toLowerCase() === usernameOrEmail || u.email === usernameOrEmail) && 
        u.password === hashedPassword
    );

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
        alert('Login successful! Redirecting to Profile...');
        window.location.href = 'profile.html';  // Redirect to Profile Page
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    alert("You have been logged out.");
    window.location.href = 'login.html';
}


function updateAuthLinks() {
    const user = sessionStorage.getItem("currentUser");
    const loginLink = document.querySelector(".login-link");
    
    if (user) {
        loginLink.textContent = "Logout";
        loginLink.href = "#";
        loginLink.onclick = logout;
    } else {
        loginLink.textContent = "Login";
        loginLink.href = "login.html";
    }
}

function showError(message) {
    const errorElement = document.getElementById('loginError');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}