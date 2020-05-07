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

    // ------------------------------------------
    //  UI For Sweet Alert
    // ------------------------------------------
    
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
}