// JavaScript for Wireframe Interactive Features
// Touchstone Task 4 - Dynamic Features

// Cart management
let cart = [];

// Newsletter Subscribe Functionality (for all pages)
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email');
    if (email && email.value.trim() !== '') {
        alert('Thank you for subscribing.');
        email.value = ''; // Clear the input
    } else {
        alert('Please enter a valid email address to subscribe.');
    }
}

// Gallery Add to Cart Functionality
function addToCart(itemName) {
    cart.push(itemName);
    alert('Item added to the cart');
    console.log('Cart contents:', cart);
}

// Gallery Clear Cart Functionality
function clearCart() {
    if (cart.length > 0) {
        cart = [];
        alert('Cart cleared');
    } else {
        alert('No items to clear.');
    }
    console.log('Cart contents after clear:', cart);
}

// Gallery Process Order Functionality
function processOrder() {
    if (cart.length > 0) {
        alert('Thank you for your order');
        cart = []; // Clear cart after processing order
    } else {
        alert('Cart is empty.');
    }
    console.log('Cart contents after processing:', cart);
}

// Contact Form Submission Functionality
function submitContactForm() {
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    
    // Check if all required fields are filled
    if (name && email && message && 
        name.value.trim() !== '' && 
        email.value.trim() !== '' && 
        message.value.trim() !== '') {
        
        alert('Thank you for your message');
        
        // Clear the form
        name.value = '';
        email.value = '';
        message.value = '';
    } else {
        alert('Please fill in all required fields (Name, Email, and Message).');
    }
}

// Service Request Functionality (for custom/services page)
function requestQuote(serviceName) {
    alert(`Thank you for your interest in "${serviceName}"! We'll contact you soon with a personalized quote.`);
}

// General button click handler for other interactive elements
function handleButtonClick(buttonText) {
    alert(`You clicked: ${buttonText}`);
}

// Initialize interactive features when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wireframe JavaScript loaded successfully!');
    
    // Add click listeners to any existing buttons
    const buttons = document.querySelectorAll('.placeholder-button');
    buttons.forEach(button => {
        if (!button.onclick) { // Only add if no specific onclick exists
            button.style.cursor = 'pointer';
            button.addEventListener('click', function() {
                handleButtonClick(this.textContent);
            });
        }
    });
});