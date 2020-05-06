const product__img = document.getElementById('product__img');
const details__name = document.getElementById('details__name');
const details__desc = document.getElementById('details__desc');
const details__price = document.getElementById('details__price');
const select_colors = document.getElementById('colors');

const addCart = document.getElementById("add_cart");

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const api = 'http://localhost:3000/api/';
const currentUrl = new URL(window.location.href);

// get value in URL
const searchParams = new URLSearchParams(currentUrl.search);
const item = searchParams.get("item");
const itemID = searchParams.get("id");

// create global variable
var ours = null;

fetch(api+item+'/'+itemID)
.then((response) => response.json())
.then(data => {
    ours = data;
    const colors = ours.colors;
    // console.log(colors.length);
    
    const img_output = '<img src="'+ours.imageUrl+'" alt="'+ours.name+'">';
    product__img.innerHTML = img_output;

    details__name.innerHTML += ours.name;
    details__desc.innerHTML += ours.description;
    details__price.innerHTML += 'Prix TTC :&nbsp; '+ours.price+' €';

    options_output = '<option value="0">Choisir une couleur</option>';
    for(var i=0; i<colors.length; i++){
        options_output +='<option value="'+i+'">'+colors[i]+'</option>"';
    }
    select_colors.innerHTML += options_output;
});


// ------------------------------------------
//  EVENTS FUNCTIONS
// ------------------------------------------

addCart.addEventListener("click", incrementCart);

function incrementCart() {
    var cartStorage = window.localStorage.getItem('CART');
    
    if(cartStorage == null) {
        createNewCart();
        console.log('panier creer !');

        var newCart = JSON.parse(window.localStorage.getItem('CART'));
        addNewItem(newCart);

        var update = JSON.parse(window.localStorage.getItem('CART'));
        console.log(update);
    } else {
        console.log('panier present !');

        var currentCart = JSON.parse(cartStorage);
        
        // check if item is in local storage
        if(checkID(currentCart)) {
            console.log('ID present : Quantité augmenté !');
        } else {
            console.log('ID non present : Article ajouté !');
            addNewItem(currentCart);
        }

        var update = JSON.parse(window.localStorage.getItem('CART'));
        console.log(update);
    }

    swal.fire({
        position: 'top',
        toast: true,
        icon: 'success',
        title: ours.name+' a été ajouté au panier',
        footer: '<a id="link_toast" href="../panier">Voir mon panier</a>',
        showConfirmButton: false,
        timer: 3500
    });
}

// ------------------------------------------
//  HELPERS FUNCTIONS
// ------------------------------------------

function createNewCart() {
    var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // add new cart in local storage + key for one user
    var CART = {
        key: key,
        items: []
    };

    window.localStorage.setItem('CART', JSON.stringify(CART));
}

function addNewItem(cart) {
    // create new item for add in cart
    var newItem = {
        id: ours._id,
        quantity: 1,
        price: ours.price
    };

    var keyCart = cart.key;
    var items = cart.items;

    // add new item in array
    items = items.concat(newItem);

    const CART = {
        key: keyCart,
        items: items
    };

    // add array in local storage 'cart'
    window.localStorage.setItem('CART', JSON.stringify(CART));
}

function checkID(cart) {
    // fait le tour des id présent dans "items"
    for(var i=0; i<cart.items.length; i++) {
        if(cart.items[i].id === ours._id) {
            incrementQty(cart, i);
            return true;
        }
    }
    return false;
}

function incrementQty(currentCart, index) {
    var updateCart = currentCart;
    var qty = currentCart.items[index].quantity;

    qty++;

    updateCart.items[index].quantity = qty;
    
    window.localStorage.setItem('CART', JSON.stringify(updateCart));
}

