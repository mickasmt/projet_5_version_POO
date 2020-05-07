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
    
    // Increment quantity 
    incrementQty(currentCart, index) {
        var updateCart = currentCart;
        var qty = currentCart.items[index].quantity;
    
        qty++;
    
        updateCart.items[index].quantity = qty;
        
        window.localStorage.setItem('CART', JSON.stringify(updateCart));
    }
}