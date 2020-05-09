const tableCart = document.getElementById('listing_cart');
const totalCart = document.getElementById('total__price');
const removeCart = document.getElementById("remove_cart");
const submitForm = document.getElementById('submitForm');

// Declare differents classes
const ui = new Ui();
const cart = new Cart();
const user = new User();
const product = new Product();

// Declare add event listener
removeCart.addEventListener("click", remove_Cart);
submitForm.addEventListener("click", formValidation)

showListItems();

// ------------------------------------------
//  FUNCTIONS
// ------------------------------------------

// list all items in showCart
function showListItems() {
  var CART = JSON.parse(window.localStorage.getItem('CART'));
  var sum = 0;
  
  if(CART) {
    if(Array.isArray(CART.items) && CART.items.length) {
      var cartLength = CART.items.length;
    
      for(var i = 0; i < cartLength; i++) {
        const index = i;
        const itemId = CART.items[i].id;
        const prix = CART.items[i].price;
        const qty = CART.items[i].quantity;
        
        const prix_calcul = prix * qty;
        sum += prix_calcul;

        // Show items in table cart
        product.getTeddyById(itemId).then(data => {
          ui.displayTableCart(data, prix_calcul, qty, index, tableCart)
        });
      }
      
      totalCart.innerHTML += 'Prix Total : '+sum+' €';
    } else {
      ui.displayHtmlEmptyCart(tableCart, totalCart);
    }
  } else {
    ui.displayHtmlEmptyCart(tableCart, totalCart);
  }
}

// augmenter ou baisser la quantité d'un article
function quantity_Item() {
  var index = parseInt(this.id);
  var quantite = parseInt(this.value);
  
  if(Number.isInteger(quantite) && quantite>0) {
    // Update quantity in cart local storage
    cart.updateQuantity(index, quantite);

    ui.displayHtmlCart(tableCart, totalCart);
    showListItems();
  } else {
    // Remove item in cart for quantity = 0
    cart.removeItemInCart(index);

    // get the new cart for to display
    var newCart = JSON.parse(window.localStorage.getItem('CART'));
    
    if(Array.isArray(newCart.items) && newCart.items.length) {
      ui.displayHtmlCart(tableCart, totalCart);
      showListItems();
    } else {
      ui.displayHtmlEmptyCart(tableCart, totalCart);
    }
  }
}

// supprime l'article du panier
function remove_Item() {
  cart.removeItemInCart(this.id);

  // get the new cart for to display
  var newCart = JSON.parse(window.localStorage.getItem('CART'));
  
  if(Array.isArray(newCart.items) && newCart.items.length) {
    ui.displayHtmlCart(tableCart, totalCart);
    showListItems();
  } else {
    ui.displayHtmlEmptyCart(tableCart, totalCart);
  }
}

// Vide totalement le panier
function remove_Cart() {
  ui.removeCart();
}

// Contact form validation
function formValidation() {
  event.preventDefault() // Annule l'action par defaut du bouton

  const dataForm = user.formVerification();
  console.log(dataForm);
  
  if(!dataForm) {
    return ui.showErrorForm();
  }

  // Confirmation envoie de la commande + redirection
  if(cart.confirmationOrder(dataForm)) {
    // supprimer le panier
    window.localStorage.clear();
    // redirection vers page confirmation avec timer
    document.location.href='http://localhost:3000/confirmation/';
  } else {
    ui.cartEmpty();
  }
}

