// Creating variables for selectors
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const image = document.getElementById("image");
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
