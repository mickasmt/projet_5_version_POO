class Cart {
    // Create a new cart if not exist
    createNewCart() {
        // Generate random key
        var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
        // Add new cart in local storage + key for one user
        var CART = {
            key: key,
            items: []
        };
    
        window.localStorage.setItem('CART', JSON.stringify(CART));
    }

    // Add new item in cart 
    addNewItem(panier, item) {
        // create new item for add in cart
        var newItem = {
            id: item._id,
            quantity: 1,
            price: item.price
        };
    
        var keyCart = panier.key;
        var items = panier.items;
    
        // add new item in array
        items = items.concat(newItem);
    
        const CART = {
            key: keyCart,
            items: items
        };
    
        // add array in local storage 'cart'
        window.localStorage.setItem('CART', JSON.stringify(CART));
    }

    // Check if item is in the cart
    checkID(panier) {
        // fait le tour des id présent dans "items"
        for(var i=0; i<panier.items.length; i++) {
            if(panier.items[i].id === item._id) {
                this.incrementQty(panier, i);
                return true;
            }
        }
        return false;
    }
    
    // Increment quantity (for page "showProduct.html")
    incrementQty(currentCart, index) {
        var updateCart = currentCart;
        var qty = currentCart.items[index].quantity;
    
        qty++;

        updateCart.items[index].quantity = qty;

        window.localStorage.setItem('CART', JSON.stringify(updateCart));
    }

    // Update quantity for one item in cart local storage
    updateQuantity(index, quantite) {
        var oldCart = JSON.parse(window.localStorage.getItem('CART'));

        // Update quantity with id
        oldCart.items[index].quantity = quantite;

        // update cart in local storage
        window.localStorage.setItem('CART', JSON.stringify(oldCart));
    }

    // Delete one item in cart local storage if quantity = 0
    removeItemInCart(index) {
        // get the old cart for to update
        var oldCart = JSON.parse(window.localStorage.getItem('CART'));

        // Delete item with index
        oldCart.items.splice(index, 1);
        
        // update cart in local storage
        window.localStorage.setItem('CART', JSON.stringify(oldCart));

        // get the new cart for to display
        var newCart = JSON.parse(window.localStorage.getItem('CART'));
    }

    // Confirmation order for the current cart
    confirmationOrder(data) {
        var cart = JSON.parse(window.localStorage.getItem('CART'));
        
        if(cart) {
            if(Array.isArray(cart.items) && cart.items.length) {
        
                var products_id = [];
                var sum_price = 0;
        
                // Creation du products_id && Calcul prix total
                for(var i = 0; i < cart.items.length; i++) {
                    products_id.push(cart.items[i].id);
            
                    var prix_item = cart.items[i].price * cart.items[i].quantity;
                    sum_price += prix_item;
                }
        
                // post body data 
                var data = {
                    contact: data, 
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
                    .then(res => this.infosOrder(res, sum_price)); // ajoute infos dans session storage
        
                return true;
            } else {
                return false;
            }
        } else {
          return false;
        }
    }

    // ajoute infos sur la commande dedans la session storage
    infosOrder(response, priceTotal) {        
        // add order infos in session storage 
        var commande = {
            order_id: response.orderId,
            total_price: priceTotal
        };
    
        window.sessionStorage.setItem('ORDER', JSON.stringify(commande));
    }
}