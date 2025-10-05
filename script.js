// JavaScript for Wireframe Interactive Features
// Touchstone Task 5 - Web Storage Features

// Initialize cart from sessionStorage
let cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];

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
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    alert('Item added to the cart');
    console.log('Cart contents saved to sessionStorage:', cart);
}

// Gallery View Cart Functionality (NEW)
function viewCart() {
    const cartData = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
    
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
    const cartData = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
    
    if (cartData.length > 0) {
        cart = [];
        sessionStorage.removeItem('shoppingCart');
        alert('Cart cleared');
    } else {
        alert('No items to clear.');
    }
    console.log('Cart cleared from sessionStorage');
}

// Gallery Process Order Functionality with sessionStorage
function processOrder() {
    const cartData = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
    
    if (cartData.length > 0) {
        // Save order to localStorage for order history
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
        
        // Clear cart after processing
        cart = [];
        sessionStorage.removeItem('shoppingCart');
        
        alert('Thank you for your order');
    } else {
        alert('Cart is empty.');
    }
    console.log('Order processed and saved to localStorage');
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
        
        // Get existing customer data or create new array
        const customerData = JSON.parse(localStorage.getItem('customerOrders')) || [];
        customerData.push(customerInfo);
        localStorage.setItem('customerOrders', JSON.stringify(customerData));
        
        alert('Thank you for your message');
        
        // Clear the form
        name.value = '';
        email.value = '';
        message.value = '';
        
        console.log('Customer information saved to localStorage:', customerInfo);
    } else {
        alert('Please fill in all required fields (Name, Email, and Message).');
    }
}

// View stored customer orders (for testing localStorage)
function viewCustomerOrders() {
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
}

// View order history (for testing localStorage)
function viewOrderHistory() {
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