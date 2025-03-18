// Updated app.js - Global Fixes & UI Enhancements

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    updateCartUI();
    setupDarkMode();

    // Load tracking system only on relevant pages
    if (document.getElementById('orderTrackingContainer')) {
        loadOrderTracking();
    }
});

function updateAuthUI() {
    const profileLink = document.getElementById('profileLink');
    const logoutBtn = document.getElementById('logoutBtn');
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

    if (currentUser) {
        profileLink.textContent = "Profile";
        profileLink.href = "profile.html";
        logoutBtn.style.display = "inline-block";
        logoutBtn.addEventListener('click', logout);
    } else {
        profileLink.textContent = "Login";
        profileLink.href = "login.html";
        logoutBtn.style.display = "none";
    }
}

// Updated app.js - Dynamic Profile Link

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    updateCartUI();
    setupDarkMode();
});

function updateAuthUI() {
    const profileLink = document.getElementById('profileLink');
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

    if (currentUser) {
        profileLink.textContent = "Profile";
        profileLink.href = "pages/profile.html";
    } else {
        profileLink.textContent = "Login";
        profileLink.href = "pages/login.html";
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    alert("Logged out successfully.");
    window.location.href = 'login.html';
}

function updateCartCount() {
    const cartCountElement = document.getElementById("cartCount");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((count, item) => count + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}
function addToCart(itemName, price) {
    const existingItem = cart.find(i => i.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = itemCount;
    }
}

// Dark Mode Toggle
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    document.body.classList.toggle('dark-mode', isDarkMode);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const darkModeEnabled = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
        });
    }
}