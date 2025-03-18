// Updated cart.js - Shopping Cart Fixes & Enhancements

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load cart items when the page loads
document.addEventListener('DOMContentLoaded', updateCartUI);

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
}

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: parseFloat(price), quantity: 1 });
    }
    saveCart();
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    saveCart();
}

function updateQuantity(itemName, quantity) {
    quantity = Math.max(1, parseInt(quantity)); // Prevent negative or zero quantity
    const cartItem = cart.find(item => item.name === itemName);
    
    if (cartItem) {
        cartItem.quantity = quantity;
        saveCart();
    }
}

function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        cart = [];
        saveCart();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

function updateCartUI() {
    const cartList = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const totalItemsElement = document.getElementById("totalItems");
    const checkoutButton = document.getElementById("proceedToCheckout");

    if (!cartList || !totalPriceElement || !totalItemsElement || !checkoutButton) return;

    cartList.innerHTML = cart.length === 0 ? "<p>Your cart is empty.</p>" : "";

    cart.forEach(item => {
        cartList.innerHTML += `
            <li class="cart-item">
                <span>${item.name} - $${item.price.toFixed(2)} x </span>               
                <span>${item.quantity}</span>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            </li>
        `;
    });

    totalPriceElement.textContent = calculateTotal();
    totalItemsElement.textContent = cart.reduce((count, item) => count + item.quantity, 0);
    checkoutButton.disabled = cart.length === 0; // Disable checkout button if cart is empty
}

document.getElementById('proceedToCheckout')?.addEventListener('click', () => {
    if (cart.length > 0) {
        localStorage.setItem('checkoutItems', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    }
});