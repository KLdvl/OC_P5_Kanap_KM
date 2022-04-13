// Creating variables for selectors
const image = document.getElementById("image");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

// Creating variable for id of product
const id = new URLSearchParams(window.location.search).get("id");

// Getting product from API
let data;
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    data = value;
  })
  .catch(function (err) {
    console.log(err);
  });

// Mapping function from API data (unique product)
function createContent(datas) {
  const productImg = `<img src="${datas.imageUrl}" alt="${datas.altTxt}">`;
  image.insertAdjacentHTML("beforeend", productImg);
}
