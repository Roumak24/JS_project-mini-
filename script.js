
/* =========================================
   1. SELECTING HTML ELEMENTS
========================================= */

const serviceList = document.getElementById("serviceList");
const cartBody = document.getElementById("cartBody");
const emptyMsg = document.getElementById("emptyMsg");
const totalAmount = document.getElementById("totalAmount");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const bookBtn = document.getElementById("bookBtn");
const message = document.getElementById("message");
const heroBtn = document.getElementById("heroBtn");


/* =========================================
   2. CREATING SERVICES ARRAY
========================================= */

const services = [

    {
        id: 1,
        name: "Dry Cleaning",
        icon: "👕",
        price: 200
    },

    {
        id: 2,
        name: "Wash & Fold",
        icon: "🧺",
        price: 100
    },

    {
        id: 3,
        name: "Ironing",
        icon: "👔",
        price: 30
    },

    {
        id: 4,
        name: "Stain Removal",
        icon: "🧹",
        price: 500
    },

    {
        id: 5,
        name: "Leather & Suede Cleaning",
        icon: "🧥",
        price: 999
    },

    {
        id: 6,
        name: "Wedding Dress Cleaning",
        icon: "👗",
        price: 2800
    }

];


/* =========================================
   3. CREATING CART ARRAY
========================================= */

let cart = [];


/* =========================================
   4. DISPLAYING ALL SERVICES
========================================= */

function displayServices() {

    serviceList.innerHTML = "";

    services.forEach(function(service) {

        // Checking whether service is already added

        const isAdded = cart.some(function(item) {

            return item.id === service.id;

        });


        // Creating service row

        const serviceRow = document.createElement("div");

        serviceRow.classList.add("service-row");


        // Adding HTML inside service row

        serviceRow.innerHTML = `

            <div>

                <span class="service-name">
                    ${service.icon} ${service.name}
                </span>

                <span class="service-price">
                    ₹${service.price.toFixed(2)}
                </span>

            </div>


            <button
                class="service-btn ${isAdded ? "remove" : ""}"
                data-id="${service.id}"
                type="button"
            >

                ${isAdded ? "Remove Item" : "Add Item"}

                <i class="fa-solid fa-circle-${isAdded ? "minus" : "plus"}"></i>

            </button>

        `;


        // Appending service row to service list

        serviceList.appendChild(serviceRow);

    });

}


/* =========================================
   5. ADDING AND REMOVING CART ITEMS
========================================= */

serviceList.addEventListener("click", function(event) {

    // Finding clicked button

    const button = event.target.closest(".service-btn");

    if (!button) return;


    // Getting service ID

    const serviceId = Number(button.dataset.id);


    // Checking whether item already exists in cart

    const existingItem = cart.find(function(item) {

        return item.id === serviceId;

    });


    if (existingItem) {

        // Removing item from cart

        cart = cart.filter(function(item) {

            return item.id !== serviceId;

        });

    }

    else {

        // Finding selected service

        const selectedService = services.find(function(item) {

            return item.id === serviceId;

        });


        // Adding selected service to cart

        cart.push(selectedService);

    }


    // Updating website

    displayServices();

    updateCart();

});


/* =========================================
   6. UPDATING CART
========================================= */

function updateCart() {

    // Clearing previous cart items

    cartBody.innerHTML = "";


    let total = 0;


    // Displaying cart items

    cart.forEach(function(item, index) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${item.name}</td>

            <td>₹${item.price.toFixed(2)}</td>

        `;


        cartBody.appendChild(row);


        // Calculating total

        total += item.price;

    });


    // Updating total amount

    totalAmount.textContent = `₹${total.toFixed(2)}`;


    // Checking whether cart is empty

    if (cart.length === 0) {

        emptyMsg.style.display = "block";

    }

    else {

        emptyMsg.style.display = "none";

    }


    updateBookButton();

}


/* =========================================
   7. FORM VALIDATION
========================================= */

function validateForm() {

    const nameValue = fullName.value.trim();

    const emailValue = email.value.trim();

    const phoneValue = phone.value.trim();


    // Name validation

    const validName = nameValue.length >= 2;


    // Email validation

    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);


    // Phone validation (10 digits)

    const validPhone =
        /^[0-9]{10}$/.test(phoneValue);


    return validName && validEmail && validPhone;

}


/* =========================================
   8. ENABLING AND DISABLING BOOK BUTTON
========================================= */

function updateBookButton() {

    if (cart.length > 0 && validateForm()) {

        bookBtn.disabled = false;

        bookBtn.style.opacity = "1";

        bookBtn.style.cursor = "pointer";

    }

    else {

        bookBtn.disabled = true;

        bookBtn.style.opacity = "0.4";

        bookBtn.style.cursor = "not-allowed";

    }

}


/* =========================================
   9. LISTENING TO INPUT CHANGES
========================================= */

fullName.addEventListener("input", function() {

    updateBookButton();

});

email.addEventListener("input", function() {

    updateBookButton();

});

phone.addEventListener("input", function() {

    updateBookButton();

});


/* =========================================
   10. BOOKING FUNCTIONALITY
========================================= */

bookBtn.addEventListener("click", function() {

    // Checking whether cart is empty

    if (cart.length === 0) {

        showMessage(
            "Please add items to your cart.",
            "error"
        );

        return;

    }


    // Validating customer details

    if (!validateForm()) {

        showMessage(
            "Please enter valid customer details.",
            "error"
        );

        return;

    }


    // Calculating total amount

    const total = cart.reduce(function(sum, item) {

        return sum + item.price;

    }, 0);


    // Creating booking object

    const booking = {

        customerName: fullName.value.trim(),

        customerEmail: email.value.trim(),

        customerPhone: phone.value.trim(),

        selectedServices: cart.map(function(item) {

            return item.name;

        }),

        totalAmount: total

    };


    // Displaying booking confirmation

    message.textContent =

        `Booking Confirmed!\n\n` +

        `Thank you, ${booking.customerName}!\n` +

        `Services: ${booking.selectedServices.join(", ")}\n` +

        `Total Amount: ₹${booking.totalAmount.toFixed(2)}\n\n`;


    message.className = "message success";


    // Resetting cart

    cart = [];


    // Updating service list and cart

    displayServices();

    updateCart();


    // Resetting form

    fullName.value = "";

    email.value = "";

    phone.value = "";


    // Disabling book button again

    updateBookButton();

});


/* =========================================
   11. DISPLAYING MESSAGES
========================================= */

function showMessage(text, type) {

    message.textContent = text;

    message.className = `message ${type}`;

}


/* =========================================
   12. HERO BUTTON FUNCTIONALITY
========================================= */

heroBtn.addEventListener("click", function() {

    document.getElementById("services").scrollIntoView({

        behavior: "smooth"

    });

});


/* =========================================
   13. INITIALIZING WEBSITE
========================================= */

displayServices();

updateCart();

updateBookButton();
