const tableCart = document.getElementById('listing_cart');
const totalCart = document.getElementById('total__price');
const removeCart = document.getElementById("remove_cart");

// get dom elements for form validation
var nom = document.getElementById('surname');
var prenom = document.getElementById('name');
var email = document.getElementById('email');
var adresse = document.getElementById('address');
var ville = document.getElementById('city');
var submitForm = document.getElementById('submitForm');


// ------------------------------------------
//  FUNCTIONS
// ------------------------------------------

showListItems();

// fait le tour des id présent dans "items"
function showListItems() {
  var CART = JSON.parse(window.localStorage.getItem('CART'));
  // console.log(CART);
  var sum = 0;
  
  if(CART) {
    if(Array.isArray(CART.items) && CART.items.length) {
      var cartLength = CART.items.length;
    
      for(var i=0; i < cartLength; i++) {
        const index = i;
        const itemID = CART.items[i].id;
        const prix = CART.items[i].price;
        const qty = CART.items[i].quantity;
        
        const prix_calcul = prix * qty;
        sum += prix_calcul;
        

        // recupere que les items dans le panier
        getItem(itemID).then(data => {
          // image ; name ; quantité ; prix

          var newRow = tableCart.insertRow(tableCart.rows.length);

          var cel0 = newRow.insertCell(0);
          var cel1 = newRow.insertCell(1);
          var cel2 = newRow.insertCell(2);
          var cel3 = newRow.insertCell(3);
          var cel4 = newRow.insertCell(4);

          cel0.innerHTML = '<img class="img_cart" src="'+data.imageUrl+'" alt="'+data.name+'" width="100px">';
          cel1.innerHTML = data.name;
          cel2.innerHTML = prix_calcul+' €';

          var inputQty = document.createElement("INPUT");
          inputQty.setAttribute("type", "number");
          inputQty.setAttribute("class", 'quantityChange');
          inputQty.setAttribute("id", index);
          inputQty.setAttribute("min", 0);
          inputQty.setAttribute("value", qty);

          inputQty.addEventListener("change", quantity_Item);
          cel3.appendChild(inputQty);

          var rmvBtn = document.createElement("A");
          rmvBtn.setAttribute("class", 'remove_item');
          rmvBtn.setAttribute("id", index);
          var img_svg = '<img src="../static/svg/x-circle.svg" alt="x"></a>';
          rmvBtn.innerHTML = img_svg;

          rmvBtn.addEventListener("click", remove_Item);
          cel4.appendChild(rmvBtn);

        });
      }
      
      totalCart.innerHTML += 'Prix Total : '+sum+' €';
    } else {
        tableCart.innerHTML = 'Panier Vide';
        totalCart.innerHTML = '';
    }
  } else {
    tableCart.innerHTML = 'Panier Vide';
    totalCart.innerHTML = '';
  }
}

// get item by ID
async function getItem(id) {
    const baseUrl = 'http://localhost:3000/api/teddies/';
    const response = await fetch(baseUrl+id);
    const data = await response.json();
    return data;
}

// ------------------------------------------
//  EVENTS FUNCTIONS
// ------------------------------------------

removeCart.addEventListener("click", remove_Cart)

// vide totalement le panier
function remove_Cart() {
  Swal.fire({
      title: 'Etes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, vidé le panier !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Panier vide !',
          'Votre panier a bien été effacé !',
          'success'
        )
        window.localStorage.clear();
        showListItems();
      }
    })

}

// augmenter ou baisser la lquantité d'un article
function quantity_Item() {
  var index = this.id;
  var quantite = parseInt(this.value);

  if(Number.isInteger(quantite) && quantite>0) {
    // get the old cart for to update
    var oldCart = JSON.parse(window.localStorage.getItem('CART'));

    // Update quantity with id
    oldCart.items[index].quantity = quantite;

    // update cart in local storage
    window.localStorage.setItem('CART', JSON.stringify(oldCart));
    
    tableCart.innerHTML = '<tr><th>Image</th><th>Article</th><th>Prix</th><th>Quantité</th><th>Supprimer</th></tr>';
    totalCart.innerHTML = '';
    showListItems();
  } else {
    // get the old cart for to update
    var oldCart = JSON.parse(window.localStorage.getItem('CART'));

    // Delete item with index
    oldCart.items.splice(index, 1);
    
    // update cart in local storage
    window.localStorage.setItem('CART', JSON.stringify(oldCart));

    // get the new cart for to display
    var newCart = JSON.parse(window.localStorage.getItem('CART'));
    
    if(Array.isArray(newCart.items) && newCart.items.length) {
      tableCart.innerHTML = '<tr><th>Image</th><th>Article</th><th>Prix</th><th>Quantité</th><th>Supprimer</th></tr>';
      totalCart.innerHTML = '';
      showListItems();
    } else {
      tableCart.innerHTML = 'Panier Vide';
      totalCart.innerHTML = '';
    }
  }
}

// supprime l'article du panier
function remove_Item() {
  var index = this.id;

  // get the old cart for to update
  var oldCart = JSON.parse(window.localStorage.getItem('CART'));

  // Delete item with index
  oldCart.items.splice(index, 1);
  
  // update cart in local storage
  window.localStorage.setItem('CART', JSON.stringify(oldCart));

  // get the new cart for to display
  var newCart = JSON.parse(window.localStorage.getItem('CART'));
  
  if(Array.isArray(newCart.items) && newCart.items.length) {
    tableCart.innerHTML = '<tr><th>Image</th><th>Article</th><th>Prix</th><th>Quantité</th><th>Supprimer</th></tr>';
    totalCart.innerHTML = '';
    showListItems();
  } else {
    tableCart.innerHTML = 'Panier Vide';
    totalCart.innerHTML = '';
  }
}

// ------------------------------------------
//  FORMS VALIDATIONS & POST
// ------------------------------------------

submitForm.addEventListener("click", formValidation)

// Validation du formulaire + redirection 
function formValidation() {
  event.preventDefault() // Annule l'action par defaut du bouton
  var errors = 0;
  
  // Check Surname
  if(nom.value !== null && nom.value.length > 2) {
    var letters = /^[A-Za-z]+$/;
    //Verifie si il y a que des lettres dans le nom
    if(nom.value.match(letters)) { 
      styleSuccess(nom);
    } else {
      styleError(nom);
      errors++;
    }
  } else {
    styleError(nom);
    errors++;
  }

  // Check Name
  if(prenom.value !== null && prenom.value.length > 2) {
    var letters = /^[A-Za-z]+$/;
    //Verifie si il y a que des lettres dans le prenom
    if(prenom.value.match(letters)) { 
      styleSuccess(prenom);
    } else {
      styleError(prenom);
      errors++;
    }
  } else {
    styleError(prenom);
    errors++;
  }

  // Check Email
  if(email.value !== null && validateEmail(email.value)) {
    styleSuccess(email);
  } else {
    styleError(email);
    errors++;
  }

  // Check Address
  if(adresse.value !== null && adresse.value.length > 8) {
    var regex = /^\d+\s[A-z]+\s[A-z]+/;
    //Verifie si c'est une adresse
    if(adresse.value.match(regex)) { 
      styleSuccess(adresse);
    } else {
      styleError(adresse);
      errors++;
    }
  } else {
    styleError(adresse);
    errors++;
  }

  // Check City
  if(ville.value !== null && ville.value.length > 2) {
    var letters = /^[A-Za-z]+$/;
    //Verifie si il y a que des lettres dans la ville
    if(ville.value.match(letters)) { 
      styleSuccess(ville);
    } else {
      styleError(ville);
      errors++;
    }
  } else {
    styleError(ville);
    errors++;
  }

  // Show error message || post request 
  if(errors !== 0) {
    showError();
    return false;
  } else {
    // Confirmation envoie de la commande + redirection
    if(confirmationOrder()) {
      // supprimer le panier
      window.localStorage.clear();
      // redirection vers page confirmation avec timer
      window.setTimeout( function(){
          document.location.href='http://localhost:3000/confirmation/';
      }, 15000 );
    } else {
      cartEmpty();
      return false;
    }
  }

}

// ------------------------------------------
//  HELPERS FUNCTIONS
// ------------------------------------------

// validation du champs email avec un regex
function validateEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

// affiche popup erreur champs input
function showError(){
  Swal.fire({
    position: 'top',
    toast: true,
    icon: 'error',
    title: 'Certains champs sont invalides !',
    showConfirmButton: false,
    timer: 2000
  });
}

// affiche popup erreur panier vide
function cartEmpty(){
  Swal.fire({
    position: 'top',
    toast: true,
    icon: 'error',
    title: 'Panier vide ! Pas de commande !',
    showConfirmButton: false,
    timer: 2000
  });
}

// modifie css input (erreur)
function styleError(element) {
  element.classList.remove("input-success");
  element.classList.add("input-error");
}

// modifie css input (success)
function styleSuccess(element) {
  element.classList.remove("input-error");
  element.classList.add("input-success");
}

// creation requete post pour la commande + envoi au serveur
function confirmationOrder() {
  const cart = JSON.parse(window.localStorage.getItem('CART'));
  
  if(cart) {
    if(Array.isArray(cart.items) && cart.items.length) {
      
      // Creation du contact
      var contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value
      };

      var products_id = [];
      var sum_price = 0;

      // Creation du products_id && Calcul prix total
      for(i=0; i<cart.items.length; i++) {
        products_id.push(cart.items[i].id);

        var prix_item = cart.items[i].price * cart.items[i].quantity;
        sum_price += prix_item;
      }

      // post body data 
      var data = {
        contact: contact, 
        products: products_id
      };

      // create request object
      const request = new Request('../api/teddies/order', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
              'Content-Type': 'application/json'
          })
      });

      // pass request object to `fetch()`
      fetch(request)
        .then(res => res.json())
        .then(res => infosOrder(res, sum_price)); // ajoute infos dans session storage

      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// ajoute infos sur la commande dedans la session storage
function infosOrder(response, priceTotal) {
  var cart = JSON.parse(window.localStorage.getItem('CART'));

  console.log('Réponse du serveur :');
  console.log(response);
  console.log('Prix Total : '+priceTotal);
  
  // add order infos in session storage 
  var commande = {
    order_id: response.orderId,
    total_price: priceTotal
  };

  window.sessionStorage.setItem('ORDER', JSON.stringify(commande));
}