// Updated checkout.js - Orders Now Include Tracking Status

const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
let currentUser  = JSON.parse(sessionStorage.getItem('currentUser ')) || null;

function loadCheckout() {
    /*if (!currentUser ) {
        alert("You must be logged in to checkout.");
        window.location.href = "login.html";
        return;
    }*/

    const checkoutContainer = document.getElementById('checkoutItems');
    const totalPriceElement = document.getElementById('totalCheckoutPrice');
    let totalPrice = 0;
    
    if (checkoutItems.length === 0) {
        checkoutContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        checkoutContainer.innerHTML = checkoutItems.map(item => {
            totalPrice += item.price * item.quantity;
            return `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
        }).join('');
    }
    
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function processPayment() {
    const fullName = document.getElementById('fullName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (!fullName || !address || !city || !postalCode || !contactNumber || !paymentMethod) {
        alert("Please fill in all shipping and payment details.");
        return;
    }

    alert("Processing payment...");

    setTimeout(() => {
        alert("Payment Successful! Your order has been placed.");
        
        saveOrder(fullName, address, document.getElementById('totalCheckoutPrice').textContent);
        localStorage.removeItem('checkoutItems');
        window.location.href = 'dashboard.html';
    }, 2000); // Simulated payment delay
}

function saveOrder(name, address, total) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const newOrder = {
        username: currentUser .username,
        name,
        address,
        total,
        date: new Date().toLocaleString(),
        status: "Processing" // Initial status
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
}

document.addEventListener('DOMContentLoaded', loadCheckout);