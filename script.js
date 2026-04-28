// Product data
const products = [
    {
        id: 1,
        name: "Lavender Dreams",
        price: 25.00,
        category: ["scented", "natural"],
        description: "Calming lavender essential oil with moisturizing shea butter",
        image: "https://via.placeholder.com/300x250/E6E6FA/000000?text=Lavender+Soap"
    },
    {
        id: 2,
        name: "Ocean Breeze",
        price: 25.00,
        category: ["scented"],
        description: "Fresh sea salt and marine botanicals for a revitalizing cleanse",
        image: "https://via.placeholder.com/300x250/87CEEB/000000?text=Ocean+Soap"
    },
    {
        id: 3,
        name: "Oatmeal Honey",
        price: 25.00,
        category: ["natural", "organic"],
        description: "Soothing oatmeal and raw honey for sensitive skin",
        image: "https://via.placeholder.com/300x250/F4E4C1/000000?text=Oatmeal+Honey"
    },
    {
        id: 4,
        name: "Citrus Burst",
        price: 25.00,
        category: ["scented", "natural"],
        description: "Energizing blend of orange, lemon, and grapefruit essential oils",
        image: "https://via.placeholder.com/300x250/FFE4B5/000000?text=Citrus+Soap"
    },
    {
        id: 5,
        name: "Charcoal Detox",
        price: 25.00,
        category: ["natural"],
        description: "Activated charcoal and tea tree oil for deep cleansing",
        image: "https://via.placeholder.com/300x250/2F4F4F/FFFFFF?text=Charcoal+Soap"
    },
    {
        id: 6,
        name: "Rose Garden",
        price: 25.00,
        category: ["scented", "organic"],
        description: "Luxurious rose petals and rosehip oil for romantic moments",
        image: "https://via.placeholder.com/300x250/FFB6C1/000000?text=Rose+Soap"
    },
    {
        id: 7,
        name: "Eucalyptus Mint",
        price: 25.00,
        category: ["scented", "natural"],
        description: "Refreshing eucalyptus and cooling peppermint for morning freshness",
        image: "https://via.placeholder.com/300x250/98FB98/000000?text=Eucalyptus+Soap"
    },
    {
        id: 8,
        name: "Coconut Cream",
        price: 25.00,
        category: ["natural", "organic"],
        description: "Pure coconut oil and cream for tropical hydration",
        image: "https://via.placeholder.com/300x250/FFEFD5/000000?text=Coconut+Soap"
    }
];

// Shopping cart
let cart = [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('all');
    setupEventListeners();
    updateCartCount();
});

// Render products based on filter
function renderProducts(filter) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category.includes(filter));
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">R${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Render products with selected filter
            renderProducts(this.dataset.filter);
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactForm();
    });
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Animate cart icon
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #8B7355;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Handle contact form submission
function handleContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send this data to a server
    console.log('Contact form submitted:', { name, email, message });
    
    // Show success message
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    document.getElementById('contact-form').reset();
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Cart functionality (you can expand this)
function viewCart() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    let cartMessage = 'Your Cart:\n';
    let total = 0;
    
    cart.forEach(item => {
        cartMessage += `${item.name} x${item.quantity} - R${(item.price * item.quantity).toFixed(2)}\n`;
        total += item.price * item.quantity;
    });
    
    cartMessage += `\nTotal: R${total.toFixed(2)}`;
    
    showNotification(`Cart total: R${total.toFixed(2)}`);
}

// Add click event to cart icon
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', viewCart);
    }
});
