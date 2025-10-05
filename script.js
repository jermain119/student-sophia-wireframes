// JavaScript for Wireframe Interactive Features
// Touchstone Task 5 - Web Storage Features

// Initialize cart safely
let cart = [];

// Safely initialize cart from sessionStorage
function initializeCart() {
    try {
        const storedCart = sessionStorage.getItem('shoppingCart');
        cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.log('SessionStorage not available, using local cart');
        cart = [];
    }
}

// Call initialization when script loads
initializeCart();

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

// Gallery Add to Cart Functionality with sessionStorage
function addToCart(itemName) {
    const item = {
        id: Date.now(),
        name: itemName,
        price: Math.floor(Math.random() * 100) + 20,
        addedAt: new Date().toLocaleString()
    };
    
    cart.push(item);
    
    // Safely save to sessionStorage
    try {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
        console.log('Cart saved to sessionStorage');
    } catch (error) {
        console.log('SessionStorage not available, cart saved locally');
    }
    
    alert('Item added to the cart');
    console.log('Cart contents:', cart);
}

// Gallery View Cart Functionality (NEW)
function viewCart() {
    let cartData = [];
    
    // Safely get cart data
    try {
        const storedCart = sessionStorage.getItem('shoppingCart');
        cartData = storedCart ? JSON.parse(storedCart) : cart;
    } catch (error) {
        cartData = cart;
        console.log('Using local cart data');
    }
    
    if (cartData.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    
    let cartDisplay = '🛒 SHOPPING CART\n\n';
    let total = 0;
    
    cartData.forEach((item, index) => {
        cartDisplay += `${index + 1}. ${item.name}\n`;
        cartDisplay += `   Price: $${item.price}\n`;
        cartDisplay += `   Added: ${item.addedAt}\n\n`;
        total += item.price;
    });
    
    cartDisplay += `Total Items: ${cartData.length}\n`;
    cartDisplay += `Total Price: $${total}`;
    
    alert(cartDisplay);
}

// Gallery Clear Cart Functionality with sessionStorage
function clearCart() {
    let cartData = [];
    
    // Safely get cart data
    try {
        const storedCart = sessionStorage.getItem('shoppingCart');
        cartData = storedCart ? JSON.parse(storedCart) : cart;
    } catch (error) {
        cartData = cart;
    }
    
    if (cartData.length > 0) {
        cart = [];
        
        // Safely clear sessionStorage
        try {
            sessionStorage.removeItem('shoppingCart');
            console.log('Cart cleared from sessionStorage');
        } catch (error) {
            console.log('Local cart cleared');
        }
        
        alert('Cart cleared');
    } else {
        alert('No items to clear.');
    }
}

// Gallery Process Order Functionality with sessionStorage
function processOrder() {
    let cartData = [];
    
    // Safely get cart data
    try {
        const storedCart = sessionStorage.getItem('shoppingCart');
        cartData = storedCart ? JSON.parse(storedCart) : cart;
    } catch (error) {
        cartData = cart;
    }
    
    if (cartData.length > 0) {
        // Save order to localStorage for order history
        try {
            const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
            const newOrder = {
                orderId: 'ORD-' + Date.now(),
                items: cartData,
                orderDate: new Date().toLocaleString(),
                totalItems: cartData.length,
                totalPrice: cartData.reduce((sum, item) => sum + item.price, 0)
            };
            
            orderHistory.push(newOrder);
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
            console.log('Order saved to localStorage');
        } catch (error) {
            console.log('Order processed locally');
        }
        
        // Clear cart after processing
        cart = [];
        try {
            sessionStorage.removeItem('shoppingCart');
        } catch (error) {
            console.log('Local cart cleared');
        }
        
        alert('Thank you for your order');
    } else {
        alert('Cart is empty.');
    }
}

// Contact Form Submission Functionality with localStorage
function submitContactForm() {
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    
    // Check if all required fields are filled
    if (name && email && message && 
        name.value.trim() !== '' && 
        email.value.trim() !== '' && 
        message.value.trim() !== '') {
        
        // Save customer information to localStorage
        const customerInfo = {
            id: 'CUST-' + Date.now(),
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim(),
            submitDate: new Date().toLocaleString(),
            orderType: 'Custom Order Request'
        };
        
        // Safely save to localStorage
        try {
            const customerData = JSON.parse(localStorage.getItem('customerOrders')) || [];
            customerData.push(customerInfo);
            localStorage.setItem('customerOrders', JSON.stringify(customerData));
            console.log('Customer information saved to localStorage:', customerInfo);
        } catch (error) {
            console.log('Customer information saved locally:', customerInfo);
        }
        
        alert('Thank you for your message');
        
        // Clear the form
        name.value = '';
        email.value = '';
        message.value = '';
    } else {
        alert('Please fill in all required fields (Name, Email, and Message).');
    }
}

// View stored customer orders (for testing localStorage)
function viewCustomerOrders() {
    try {
        const orders = JSON.parse(localStorage.getItem('customerOrders')) || [];
        if (orders.length === 0) {
            alert('No customer orders found in localStorage.');
            return;
        }
        
        let orderDisplay = '📋 CUSTOMER ORDERS (localStorage)\n\n';
        orders.forEach((order, index) => {
            orderDisplay += `${index + 1}. ${order.name} (${order.email})\n`;
            orderDisplay += `   Order Type: ${order.orderType}\n`;
            orderDisplay += `   Date: ${order.submitDate}\n`;
            orderDisplay += `   Message: ${order.message}\n\n`;
        });
        
        alert(orderDisplay);
    } catch (error) {
        alert('Error accessing localStorage. No customer orders available.');
    }
}

// View order history (for testing localStorage)
function viewOrderHistory() {
    try {
        const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        if (orders.length === 0) {
            alert('No order history found in localStorage.');
            return;
        }
        
        let historyDisplay = '📦 ORDER HISTORY (localStorage)\n\n';
        orders.forEach((order, index) => {
            historyDisplay += `${index + 1}. Order ${order.orderId}\n`;
            historyDisplay += `   Items: ${order.totalItems}\n`;
            historyDisplay += `   Total: $${order.totalPrice}\n`;
            historyDisplay += `   Date: ${order.orderDate}\n\n`;
        });
        
        alert(historyDisplay);
    } catch (error) {
        alert('Error accessing localStorage. No order history available.');
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