// Getting data from API
let data;
fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    data = value;
    mapArray(data);
  })
  .catch(function (err) {
    console.log(err);
  });

// Creating variable for items to inject
const queryItems = document.getElementById("items");

// Mapping function for API data
function mapArray(datas) {
  for (let i = 0; i < datas.length; i++) {
    // Creating card for product
    const productItem = `<a href="./product.html?id=${datas[i]._id}">
<article>
  <img src="${datas[i].imageUrl}" alt="${datas[i].altTxt}">
  <h3 class="productName">${datas[i].name}</h3>
  <p class="productDescription">${datas[i].description}</p>
</article>
</a>`;
    queryItems.insertAdjacentHTML("beforeend", productItem);
  }
}
