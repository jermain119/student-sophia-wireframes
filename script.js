// JavaScript for Wireframe Interactive Features
// Touchstone Task 4 - Dynamic Features

// Newsletter Subscribe Functionality (for all pages)
function subscribeNewsletter() {
    const email = document.getElementById('email-input');
    if (email && email.value.trim() !== '') {
        alert(`Thank you for subscribing with email: ${email.value}`);
        email.value = ''; // Clear the input
    } else {
        alert('Please enter a valid email address to subscribe.');
    }
}

// Gallery Add to Cart Functionality
function addToCart(itemName) {
    alert(`"${itemName}" has been added to your cart!`);
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
        
        alert(`Thank you ${name.value}! Your message has been sent successfully. We'll get back to you at ${email.value}.`);
        
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