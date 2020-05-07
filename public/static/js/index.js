const teddiesList = document.getElementById('teddies_list');

const ui = new Ui();
const product = new Product();

product.getTeddies().then(data => ui.displayItems(data, teddiesList));