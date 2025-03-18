// Updated dashboard.js - Fixes for Saved Builds & Order History

let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

document.addEventListener('DOMContentLoaded', () => {
    if (!currentUser) {
        alert("You must be logged in to access the dashboard.");
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('usernameDisplay').textContent = currentUser.username;
    loadSavedBuilds();
    loadOrderHistory();
    loadOrderTracking();
    document.getElementById('logoutBtn').addEventListener('click', logout);
});

function loadSavedBuilds() {
    const buildsContainer = document.getElementById('savedBuildsContainer');
    const savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
    const userBuilds = savedBuilds.filter(build => build.username === currentUser.username);
    
    buildsContainer.innerHTML = userBuilds.length ?
        userBuilds.map(build => `<li>${build.name} - $${build.totalPrice}</li>`).join('') :
        '<p>No saved builds.</p>';
}

// Load order tracking
function loadOrderTracking() {
    const orderTrackingContainer = document.getElementById('orderTrackingContainer');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.username === currentUser.username);

    if (userOrders.length === 0) {
        orderTrackingContainer.innerHTML = '<p>No orders found.</p>';
    } else {
        orderTrackingContainer.innerHTML = userOrders.map(order => renderOrderTracking(order)).join('');
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    alert("You have been logged out.");
    window.location.href = 'login.html';
}
