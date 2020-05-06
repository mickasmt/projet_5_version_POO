const teddiesList = document.getElementById('teddies_list');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

const urls = [
    'http://localhost:3000/api/teddies'
];

Promise.all(urls.map(url =>
    fetch(url)
        .then(checkStatus)                 
        .then(parseJSON)
        .catch(error => console.log('There was a problem!', error))
))
.then(data => {
    // console.log(data);
    const teddiesList = data[0];

    generateTeddies(teddiesList);
})
  

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJSON(response) {
    return response.json();
}

function generateTeddies(data) {
    const teddies = data.map(item => `
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
    teddiesList.innerHTML = teddies;
}
