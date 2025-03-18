// Updated products.js - Fixing Filters & Wishlist Functionality

let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, category: 'cpu', name: 'Intel Core i9-12900K', price: 599.99, brand: 'Intel', specs: '16 cores, 5.2GHz', compatibility: 'Intel', stock: 15, image: '../images/cpu1.jpg' },
    { id: 2, category: 'gpu', name: 'NVIDIA RTX 4090', price: 1699.99, brand: 'NVIDIA', specs: '24GB GDDR6X', compatibility: 'PCIe 4.0', stock: 8, image: '../images/gpu1.jpg' },
    { id: 3, category: 'cpu', name: 'Intel Core i7-13700K', price: 429.99, brand: 'Intel', specs: '16 cores, 5.4GHz', compatibility: 'Intel', stock: 20, image: '../images/cpu1.jpg' },
    { id: 4, category: 'cpu', name: 'AMD Ryzen 7 7800X3D', price: 479.99, brand: 'AMD', specs: '8 cores, 5.0GHz', compatibility: 'AMD', stock: 18, image: '../images/cpu1.jpg' },
    { id: 5, category: 'cpu', name: 'Intel Core i5-13600K', price: 319.99, brand: 'Intel', specs: '14 cores, 5.1GHz', compatibility: 'Intel', stock: 25, image: '../images/cpu1.jpg' },
    
    // GPUs
    { id: 6, category: 'gpu', name: 'NVIDIA RTX 4090', price: 1699.99, brand: 'NVIDIA', specs: '24GB GDDR6X', compatibility: 'PCIe 4.0', stock: 8 },
    { id: 7, category: 'gpu', name: 'AMD Radeon RX 7900 XTX', price: 1099.99, brand: 'AMD', specs: '24GB GDDR6', compatibility: 'PCIe 4.0', stock: 10 },
    { id: 8, category: 'gpu', name: 'NVIDIA RTX 4080', price: 1199.99, brand: 'NVIDIA', specs: '16GB GDDR6X', compatibility: 'PCIe 4.0', stock: 12 },
    { id: 9, category: 'gpu', name: 'AMD Radeon RX 7800 XT', price: 599.99, brand: 'AMD', specs: '16GB GDDR6', compatibility: 'PCIe 4.0', stock: 15 },
    { id: 10, category: 'gpu', name: 'NVIDIA RTX 4070', price: 599.99, brand: 'NVIDIA', specs: '12GB GDDR6X', compatibility: 'PCIe 4.0', stock: 20 },
    
    // RAM
    { id: 11, category: 'ram', name: 'Corsair Vengeance 32GB DDR5', price: 149.99, brand: 'Corsair', specs: '32GB (2x16GB) DDR5-6000', compatibility: 'DDR5', stock: 30 },
    { id: 12, category: 'ram', name: 'G.Skill Trident Z5 32GB DDR5', price: 189.99, brand: 'G.Skill', specs: '32GB (2x16GB) DDR5-6400', compatibility: 'DDR5', stock: 25 },
    { id: 13, category: 'ram', name: 'Kingston Fury 32GB DDR4', price: 109.99, brand: 'Kingston', specs: '32GB (2x16GB) DDR4-3600', compatibility: 'DDR4', stock: 22 },
    { id: 14, category: 'ram', name: 'Crucial Ballistix 32GB DDR4', price: 119.99, brand: 'Crucial', specs: '32GB (2x16GB) DDR4-3200', compatibility: 'DDR4', stock: 18 },
    
    // Storage
    { id: 15, category: 'storage', name: 'Samsung 990 Pro 2TB NVMe SSD', price: 249.99, brand: 'Samsung', specs: '2TB, PCIe 4.0, 7000MB/s', compatibility: 'M.2 NVMe', stock: 20 },
    { id: 16, category: 'storage', name: 'WD Black SN850X 1TB NVMe SSD', price: 159.99, brand: 'Western Digital', specs: '1TB, PCIe 4.0, 7300MB/s', compatibility: 'M.2 NVMe', stock: 25 },
    { id: 17, category: 'storage', name: 'Seagate Barracuda 4TB HDD', price: 89.99, brand: 'Seagate', specs: '4TB, 7200RPM', compatibility: 'SATA', stock: 30 },
    { id: 18, category: 'storage', name: 'Crucial MX500 2TB SATA SSD', price: 159.99, brand: 'Crucial', specs: '2TB, SATA, 560MB/s', compatibility: 'SATA', stock: 22 },
    
    // Motherboards
    { id: 19, category: 'motherboard', name: 'ASUS ROG Z790 Hero', price: 629.99, brand: 'ASUS', specs: 'Z790, WiFi 6E, DDR5', compatibility: 'Intel', stock: 10 },
    { id: 20, category: 'motherboard', name: 'MSI MEG X670E GODLIKE', price: 899.99, brand: 'MSI', specs: 'X670E, WiFi 6E, DDR5', compatibility: 'AMD', stock: 8 },
    { id: 21, category: 'motherboard', name: 'Gigabyte B760 AORUS ELITE', price: 239.99, brand: 'Gigabyte', specs: 'B760, WiFi 6, DDR5', compatibility: 'Intel', stock: 15 },
    { id: 22, category: 'motherboard', name: 'ASRock B650 PG Riptide', price: 199.99, brand: 'ASRock', specs: 'B650, PCIe 5.0, DDR5', compatibility: 'AMD', stock: 12 },
    
    // Power Supplies
    { id: 23, category: 'powerSupply', name: 'Corsair RM1000X 1000W PSU', price: 219.99, brand: 'Corsair', specs: '1000W, Fully Modular, 80+ Gold', compatibility: 'ATX', stock: 15 },
    { id: 24, category: 'powerSupply', name: 'EVGA SuperNOVA 850 G6', price: 159.99, brand: 'EVGA', specs: '850W, Fully Modular, 80+ Gold', compatibility: 'ATX', stock: 18 },
    { id: 25, category: 'powerSupply', name: 'be quiet! Dark Power 12 1200W', price: 369.99, brand: 'be quiet!', specs: '1200W, Fully Modular, 80+ Titanium', compatibility: 'ATX', stock: 10 },
    
    // Cooling
    { id: 26, category: 'cooling', name: 'NZXT Kraken X73 RGB AIO', price: 199.99, brand: 'NZXT', specs: '360mm Radiator, RGB', compatibility: 'All CPUs', stock: 12 },
    { id: 27, category: 'cooling', name: 'Noctua NH-D15', price: 109.99, brand: 'Noctua', specs: 'Dual Tower, Dual Fan', compatibility: 'All CPUs', stock: 20 },
    { id: 28, category: 'cooling', name: 'Corsair iCUE H150i ELITE LCD', price: 289.99, brand: 'Corsair', specs: '360mm Radiator, LCD Display', compatibility: 'All CPUs', stock: 15 },
    
    // Cases
    { id: 29, category: 'case', name: 'Lian Li PC-O11 Dynamic', price: 149.99, brand: 'Lian Li', specs: 'Mid Tower, Tempered Glass', compatibility: 'ATX, MicroATX, Mini-ITX', stock: 18 },
    { id: 30, category: 'case', name: 'Corsair 5000D Airflow', price: 174.99, brand: 'Corsair', specs: 'Mid Tower, High Airflow', compatibility: 'ATX, MicroATX, Mini-ITX', stock: 15 },
    { id: 31, category: 'case', name: 'Fractal Design Meshify 2', price: 159.99, brand: 'Fractal Design', specs: 'Mid Tower, Mesh Front', compatibility: 'ATX, MicroATX, Mini-ITX', stock: 20 },
    { id: 32, category: 'case', name: 'NZXT H7 Flow', price: 129.99, brand: 'NZXT', specs: 'Mid Tower, Minimalist Design', compatibility: 'ATX, MicroATX, Mini-ITX', stock: 22 }
    
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.addEventListener('DOMContentLoaded', loadProducts);

function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image || '../images/default.png'}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn" onclick="toggleWishlist('${product.name}')">${isInWishlist(product.name) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
            </div>`;
    });
}

function filterProducts() {
    const searchFilter = document.getElementById('searchFilter').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    const filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchFilter) ||
                              product.brand.toLowerCase().includes(searchFilter) ||
                              product.specs.toLowerCase().includes(searchFilter);
        return matchesCategory && matchesSearch;
    });
    
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image || '../images/default.png'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Stock: ${product.stock > 0 ? product.stock : 'Out of stock'}</p>
            <button class="btn" ${product.stock > 0 ? `onclick="addToCart(${product.id})"` : 'disabled'}>
                ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button class="btn" onclick="toggleWishlist('${product.name}')">${isInWishlist(product.name) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
        </div>
    `).join('');
    updateCartCount();
}

function addToCart(productId) {
    let selectedProduct = products.find(p => p.id === productId);
    let cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...selectedProduct, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cartCountElement = document.getElementById("cartCount");
    let itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.textContent = itemCount;
    }
}

function clearFilters() {
    document.getElementById('searchFilter').value = '';
    document.getElementById('categoryFilter').value = 'all';
    loadProducts();
}

function toggleWishlist(itemName) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (wishlist.includes(itemName)) {
        wishlist = wishlist.filter(item => item !== itemName);
        alert(`${itemName} removed from Wishlist`);
    } else {
        wishlist.push(itemName);
        alert(`${itemName} added to Wishlist`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadProducts(); // Refresh UI
}

function isInWishlist(itemName) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.includes(itemName);
}