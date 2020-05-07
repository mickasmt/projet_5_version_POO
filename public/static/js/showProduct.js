// Button add cart
const addCart = document.getElementById("add_cart");

// Global variable
var item = null;

// Declare differents classes
const ui = new Ui();
const cart = new Cart();
const product = new Product();

// Get id in current url
const currentUrl = new URL(window.location.href);
const itemId = new URLSearchParams(currentUrl.search).get("id");

// Show product in the page
product.getTeddyById(itemId).then(data => {
    item = data;
    ui.displayOneItem(data);
});

// Add EventListener on the button "Ajouter au panier" 
addCart.addEventListener("click", incrementCart);

// Function for event listener 
function incrementCart() {
    var cartStorage = window.localStorage.getItem('CART');
    
    if(!cartStorage) {
        cart.createNewCart();

        // Get the new cart in localStorage & add the current item
        const newCart = JSON.parse(window.localStorage.getItem('CART'));
        cart.addNewItem(newCart, item);
    } else {
        const currentCart = JSON.parse(cartStorage);
        
        // Check if item is in the current local storage
        if(!cart.checkID(currentCart)) {
            cart.addNewItem(currentCart, item);
        }
    }

    ui.successAddItem(item.name);
}