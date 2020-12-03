var orderContainer = document.getElementById('order_container');
var ORDER = JSON.parse(window.sessionStorage.getItem('ORDER'));

// Declare Ui class
const ui = new Ui();

if(ORDER) {
    console.log(ORDER);
    
    ui.successOrder();
    
    // get element by id for to display order infos
    var numCommande = document.getElementById('num_order');
    var totalCommande = document.getElementById('prix_total');
    
    numCommande.innerHTML += 'Numéro de votre commande : &nbsp;'+ ORDER.order_id;
    totalCommande.innerHTML += 'Prix Total : '+ ORDER.total_price+' €';
} else {
    orderContainer.innerHTML = '<h2 class="title__list">Vous n\'avez pas encore commander !</h2>';
}