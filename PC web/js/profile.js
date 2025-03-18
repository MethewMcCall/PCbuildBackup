// profile.js - User Profile Functionality

let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (!currentUser) {
        alert("You must be logged in to view your profile.");
        window.location.href = 'login.html';
        return;
    }
    
    displayUserInfo();
    displaySavedBuilds();
    displayWishlist();
});

function displayUserInfo() {
    document.getElementById('profileUsername').textContent = currentUser.username;
    document.getElementById('profileEmail').textContent = currentUser.email;
}

function displaySavedBuilds() {
    const buildsList = document.getElementById('savedBuildsList');
    const userBuilds = savedBuilds.filter(build => build.username === currentUser.username);

    buildsList.innerHTML = userBuilds.length
        ? userBuilds.map(build => `<li>${build.name} - $${build.totalPrice}</li>`).join('')
        : '<p>No saved builds.</p>';
}

function displayWishlist() {
    const wishlistList = document.getElementById('wishlistItems');
    
    wishlistList.innerHTML = wishlist.length
        ? wishlist.map(item => `<li>${item} <button class="btn" onclick="removeFromWishlist('${item}')">Remove</button></li>`).join('')
        : '<p>Your wishlist is empty.</p>';
}

function removeFromWishlist(itemName) {
    wishlist = wishlist.filter(item => item !== itemName);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    displayWishlist();
}

async function updatePassword() {
    let newPassword = document.getElementById('newPassword').value;
    let confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (newPassword !== confirmNewPassword) {
        alert("Passwords do not match.");
        return;
    }

    let userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].password = await hashPassword(newPassword);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Password updated successfully!");
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
