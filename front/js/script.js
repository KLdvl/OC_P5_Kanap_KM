// Creating variable for items to inject
const queryItems = document.getElementById("items");
const serverUrl = "http://localhost:3000/api/products/";

// Getting data from API
let data;
fetch(serverUrl)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    data = value;
    createContent(data);
  })
  .catch(function (err) {
    console.log(err);
  });

// Mapping function from API data
function createContent(datas) {
  for (let i = 0; i < datas.length; i++) {
    // Creating card for product
    const productItem = `<a href="./product.html?id=${datas[i]._id}">
<article>
  <img src="${datas[i].imageUrl}" alt="${datas[i].altTxt}">
  <h3 class="productName">${datas[i].name}</h3>
  <p class="productDescription">${datas[i].description}</p>
</article>
</a>`;
    // Insert template into DOM
    queryItems.insertAdjacentHTML("beforeend", productItem);
  }
}
