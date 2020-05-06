
var orderContainer = document.getElementById('order_container');

var commande = JSON.parse(window.sessionStorage.getItem('ORDER'));

if(commande) {
    console.log(commande);
    
    // Show Popup Success
    Swal.fire({
        position: 'top',
        toast: true,
        icon: 'success',
        title: 'Félicitation ! Votre commande est en cours de préparation !',
        showConfirmButton: false,
        timer: 2500
    });
    
    // get element by id for to display order infos
    var numCommande = document.getElementById('num_order');
    var totalCommande = document.getElementById('prix_total');
    
    numCommande.innerHTML += 'Numéro de votre commande : &nbsp;'+ commande.order_id;
    totalCommande.innerHTML += 'Prix Total : '+ commande.total_price+' €';
} else {
    orderContainer.innerHTML = '<h2 class="title__list">Vous n\'avez pas encore commander !</h2>';
}