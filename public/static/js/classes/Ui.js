class Ui {
    // Generate list html in container with data
    displayItems(data, container) {
        const items = data.map(item => `
            <div class="item">
                <a href="/products/?item=teddies&id=${item._id}">
                    <img class="item__img" src="${item.imageUrl}" alt="${item.name}">
                    <div class="item__desc">
                        <span>${item.name}</span>
                        <span>${item.price} €</span>
                    </div>
                </a>
            </div>
        `).join('');
        container.innerHTML = items;
    }

    // Show one item in showProduct.html
    displayOneItem(data) {
        // Get html elements with "getElementById"
        const product__img = document.getElementById('product__img');
        const details__name = document.getElementById('details__name');
        const details__desc = document.getElementById('details__desc');
        const details__price = document.getElementById('details__price');
        const select_colors = document.getElementById('colors');

        // Add data in differents elements 
        product__img.innerHTML = '<img src="'+data.imageUrl+'" alt="'+data.name+'">';
        details__name.innerHTML += data.name;
        details__desc.innerHTML += data.description;
        details__price.innerHTML += 'Prix TTC :&nbsp; '+data.price+' €';

        // Generate html for select input
        var options_output = '<option value="0">Choisir une couleur</option>';
        for(var i=0; i<data.colors.length; i++){
            options_output += '<option value="'+i+'">'+data.colors[i]+'</option>';
        }
        select_colors.innerHTML += options_output;
    }

    // Show one item in showProduct.html
    displayTableCart(data, price, quantity, index, container) {

        var newRow = container.insertRow(container.rows.length);

        var cel0 = newRow.insertCell(0);
        var cel1 = newRow.insertCell(1);
        var cel2 = newRow.insertCell(2);
        var cel3 = newRow.insertCell(3);
        var cel4 = newRow.insertCell(4);

        cel0.innerHTML = '<img class="img_cart" src="'+data.imageUrl+'" alt="'+data.name+'" width="100px">';
        cel1.innerHTML = data.name;
        cel2.innerHTML = price+' €';

        var inputQty = document.createElement("INPUT");
        inputQty.setAttribute("type", "number");
        inputQty.setAttribute("class", 'quantityChange');
        inputQty.setAttribute("id", index);
        inputQty.setAttribute("min", 0);
        inputQty.setAttribute("value", quantity);

        inputQty.addEventListener("change", quantity_Item);
        cel3.appendChild(inputQty);

        var rmvBtn = document.createElement("A");
        rmvBtn.setAttribute("class", 'remove_item');
        rmvBtn.setAttribute("id", index);
        var img_svg = '<img src="../static/svg/x-circle.svg" alt="x"></a>';
        rmvBtn.innerHTML = img_svg;

        rmvBtn.addEventListener("click", remove_Item);
        cel4.appendChild(rmvBtn);
    }

    // Change style if error
    styleError(element) {
        element.classList.remove("input-success");
        element.classList.add("input-error");
    }
      
    // Change style if success
    styleSuccess(element) {
        element.classList.remove("input-error");
        element.classList.add("input-success");
    }

    // Display html if cart have items
    displayHtmlCart(tableContainer, totalContainer) {
        tableContainer.innerHTML = '<tr><th>Image</th><th>Article</th><th>Prix</th><th>Quantité</th><th>Supprimer</th></tr>';
        totalContainer.innerHTML = '';
    }

    // Display html if cart is empty
    displayHtmlEmptyCart(tableContainer, totalContainer) {
        tableContainer.innerHTML = 'Panier Vide';
        totalContainer.innerHTML = '';
    }
    // ------------------------------------------
    //  UI For Sweet Alert
    // ------------------------------------------

    // Show alert for to add new item in cart
    successAddItem(name) {
        swal.fire({
            position: 'top',
            toast: true,
            icon: 'success',
            title: name+' a été ajouté au panier',
            footer: '<a id="link_toast" href="../panier">Voir mon panier</a>',
            showConfirmButton: false,
            timer: 3500
        });
    }

    // Show alert if 
    successOrder() {
        swal.fire({
            position: 'top',
            toast: true,
            icon: 'success',
            title: 'Félicitation ! Votre commande est en cours de préparation !',
            showConfirmButton: false,
            timer: 2500
        });
    }

    // Show alert for to remove the whole cart
    removeCart() {
        swal.fire({
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
                swal.fire(
                    'Panier vide !',
                    'Votre panier a bien été effacé !',
                    'success'
                )
                window.localStorage.clear();
                showListItems();
            }
        })
    }

    // Show alert error for the form
    showErrorForm(){
        swal.fire({
            position: 'top',
            toast: true,
            icon: 'error',
            title: 'Certains champs sont invalides !',
            showConfirmButton: false,
            timer: 2000
        });
    }

    // Show alert if cart is empty
    cartEmpty(){
        swal.fire({
            position: 'top',
            toast: true,
            icon: 'error',
            title: 'Panier vide ! Pas de commande !',
            showConfirmButton: false,
            timer: 2000
        });
    }
}