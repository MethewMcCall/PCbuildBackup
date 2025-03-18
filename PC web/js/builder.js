// Updated builder.js - PC Builder Fixes & Compatibility Checks

let pcBuild = JSON.parse(localStorage.getItem('pcBuild')) || {};
let products = JSON.parse(localStorage.getItem('products')) || [];
let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null; // Ensure builds are user-specific

function showComponentOptions(componentType) {
    const optionsContainer = document.getElementById('componentOptionsContainer');
    const componentOptions = products.filter(product => product.category === componentType);
    
    optionsContainer.innerHTML = componentOptions.length
        ? componentOptions.map(option => `
            <div class="component-option">
                <img src="${option.image || '../images/default.png'}" alt="${option.name}" class="component-image">
                <h4>${option.name}</h4>
                <p>Price: $${option.price.toFixed(2)}</p>
                <button class="btn" onclick="addComponentToBuild('${componentType}', '${option.name}', ${option.price}, '${option.compatibility}')">Add</button>
            </div>`).join('')
        : '<p>No options available for this component.</p>';
}

function addComponentToBuild(type, name, price, compatibility) {
    if (type === 'cpu' || type === 'motherboard') {
        const existingMotherboard = pcBuild['motherboard'];
        const existingCPU = pcBuild['cpu'];

        if ((type === 'cpu' && existingMotherboard && existingMotherboard.compatibility !== compatibility) || 
            (type === 'motherboard' && existingCPU && existingCPU.compatibility !== compatibility)) {
            alert('Incompatible component selected! Please choose a compatible motherboard/CPU.');
            return;
        }
    }

    pcBuild[type] = { name, price, compatibility };
    saveBuildLocally();
    updateBuildPreview();
}

function saveBuild(name) {
    if (!currentUser) {
        alert("You must be logged in to save a build.");
        return;
    }
    if (!name) {
        alert("Please enter a name for your build.");
        return;
    }

    let savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
    if (savedBuilds.some(build => build.name === name && build.username === currentUser.username)) {
        alert("A build with this name already exists. Choose a different name.");
        return;
    }

    savedBuilds.push({ username: currentUser.username, name, components: pcBuild, totalPrice: calculateBuildTotal() });
    localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
    alert(`Build "${name}" saved successfully.`);
}

function addBuildToCart() {
    for (const component in pcBuild) {
        addToCart(pcBuild[component].name, pcBuild[component].price);
    }
}

function clearBuild() {
    pcBuild = {};
    saveBuildLocally();
    updateBuildPreview();
}

function calculateBuildTotal() {
    return Object.values(pcBuild).reduce((total, component) => total + component.price, 0).toFixed(2);
}

function saveBuildLocally() {
    localStorage.setItem('pcBuild', JSON.stringify(pcBuild));
}

function updateBuildPreview() {
    const buildPreview = document.getElementById('buildPreview');
    const totalPrice = document.getElementById('totalPrice');

    buildPreview.innerHTML = Object.entries(pcBuild).map(([type, component]) => 
        `<div class="build-item">
            <p><strong>${type.toUpperCase()}</strong>: ${component.name} - $${component.price}</p>
            <button class="remove-btn" onclick="removeComponent('${type}')">Remove</button>
        </div>`).join('');

    totalPrice.textContent = `Total Price: $${calculateBuildTotal()}`;
}

function removeComponent(type) {
    delete pcBuild[type];
    saveBuildLocally();
    updateBuildPreview();
}

document.addEventListener('DOMContentLoaded', () => {
    if (!products.length) {
        fetchProducts();
    }
    updateBuildPreview();
});

function fetchProducts() {
    const sampleProducts = [
        { name: "Intel i7", category: "cpu", price: 300, compatibility: "intel", image: '../images/cpu1.jpg' },
        { name: "AMD Ryzen 7", category: "cpu", price: 280, compatibility: "amd", image: '../images/cpu1.jpg' },
        { name: "Asus Motherboard", category: "motherboard", price: 150, compatibility: "intel", image: '../images/cpu1.jpg' },
        { name: "MSI Motherboard", category: "motherboard", price: 140, compatibility: "amd", image: '../images/cpu1.jpg' },
        { name: "Corsair RAM 16GB", category: "ram", price: 80, compatibility: "universal", image: '../images/cpu1.jpg' }
    ];
    localStorage.setItem('products', JSON.stringify(sampleProducts));
    products = sampleProducts;
}
