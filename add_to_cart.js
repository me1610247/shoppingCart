let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let orderNowButton = document.querySelector('.orderNow');
// add_to_cart.js

// Get the cart element
var cart = document.querySelector('.card');

// Get the shopping cart element
var shoppingCart = document.querySelector('.shopping');

// Add a click event listener to the shopping cart element
shoppingCart.addEventListener('click', function() {
  // Toggle the "open" class on the cart element
  cart.classList.toggle('open');
});

let products = [
    {
        id: 1,
        name: 'Redmi note 7',
        image: '1.jpg',
        price: 7000,
    },
    {
        id: 2,
        name: 'Airpods bro',
        image: '2.jpg',
        price: 8000,
    },
    {
        id: 3,
        name: 'iphone 14 pro max',
        image: '3.jpg',
        price: 28000,
    },
    {
        id: 4,
        name: 'iphone 14 pro max',
        image: '4.jpg',
        price: 28000,
    },
    {
        id: 5,
        name: 'Apple watch smart',
        image: '5.jpg',
        price: 9500,
    },
];
let listCards = [];
let totalPrice = 0;

function initApp() {
    // Retrieve cart data from local storage
    const savedCartData = localStorage.getItem('cartData');

    if (savedCartData) {
        listCards = JSON.parse(savedCartData);
        reloadCard();
    }

    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    alert("Item Added Successfully")
    const product = products[key];
    const existingItem = listCards.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += product.price;
    } else {
        const newItem = {
            ...product,
            quantity: 1,
            totalPrice: product.price
        };
        listCards.push(newItem);
    }

    totalPrice += product.price;
    reloadCard();

    // Save cart data to local storage
    localStorage.setItem('cartData', JSON.stringify(listCards));
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;

    listCards.forEach((value, key) => {
        count += value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <br>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
            orderNowButton.style.display = 'block';
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

orderNowButton.addEventListener('click', () => {
    let selectedItems = [];

    listCards.forEach((value) => {
        if (value != null) {
            selectedItems.push({
                product_name: value.name,
                quantity: value.quantity,
                totalPrice: value.totalPrice,
            });
        }
    });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_order.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                orderPlacedSuccessfully();
            } else {
                console.log('Error saving order details: ' + xhr.responseText);
            }
        }
    };

    let data = JSON.stringify(selectedItems);
    xhr.send(data);
});

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        listCards.splice(key, 1);
    } else {
        const product = listCards[key];
        product.quantity = quantity;
        product.totalPrice = quantity * product.price;
    }
    calculateTotalPrice();
    reloadCard();

    // Save cart data to local storage
    localStorage.setItem('cartData', JSON.stringify(listCards));
}

function calculateTotalPrice() {
    totalPrice = 0;

    listCards.forEach((value) => {
        if (value != null) {
            totalPrice += value.totalPrice;
        }
    });
}

function orderPlacedSuccessfully() {
    alert('Order placed successfully!');
}