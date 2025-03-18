// tracking.js - Order Tracking Management

document.addEventListener('DOMContentLoaded', displayOrderTracking);

let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

function displayOrderTracking() {
    const orderTrackingContainer = document.getElementById('orderTrackingContainer');
    if (!currentUser) {
        orderTrackingContainer.innerHTML = '<p>Please log in to view order tracking.</p>';
        return;
    }
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    // Filter orders for current user
    let userOrders = orders.filter(order => order.username === currentUser.username);
    
    if (userOrders.length === 0) {
        orderTrackingContainer.innerHTML = '<p>No orders found.</p>';
    } else {
        orderTrackingContainer.innerHTML = userOrders.map(order => renderOrderTracking(order)).join('');
    }
}

function renderOrderTracking(order) {
    // Define the order statuses
    const statuses = ["Processing", "Shipped", "Delivered"];
    // Determine the index of the current status
    let activeIndex = statuses.indexOf(order.status);
    // Build progress bar HTML
    let progressBarHTML = `<div class="progress-bar">`;
    statuses.forEach((status, index) => {
        progressBarHTML += `<div class="progress-step ${index <= activeIndex ? 'active' : ''}">
            <span class="step-label">${status}</span>
        </div>`;
        if (index < statuses.length - 1) {
            progressBarHTML += `<div class="progress-line ${index < activeIndex ? 'active' : ''}"></div>`;
        }
    });
    progressBarHTML += `</div>`;

    return `
        <li class="order-tracking-item">
            <p><strong>Order Date:</strong> ${order.date}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            ${progressBarHTML}
        </li>
    `;
}

// Simulate status updates for demonstration purposes
function simulateStatusUpdate() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let updated = false;
    orders = orders.map(order => {
        if (order.username === currentUser.username) {
            if (order.status === "Processing") {
                order.status = "Shipped";
                updated = true;
            } else if (order.status === "Shipped") {
                order.status = "Delivered";
                updated = true;
            }
        }
        return order;
    });
    if (updated) {
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrderTracking();
        alert("Order status updated for simulation.");
    } else {
        alert("No orders available for status update simulation.");
    }
}

// Optional: Attach simulation to a button if one exists in the UI
document.addEventListener('DOMContentLoaded', () => {
    const updateBtn = document.getElementById('simulateUpdateBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', simulateStatusUpdate);
    }
});
