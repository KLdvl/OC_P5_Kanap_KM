// Creating variables for selectors
const image = document.getElementById("image");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

// Creating variable for url
const serverUrl = "http://localhost:3000/api/products/";

// Creating variable for id of product
const id = new URLSearchParams(window.location.search).get("id");

// Getting product from API
let data;
fetch(`${serverUrl}${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    data = value;
    createContent(data);
    populateContent(title, data.name);
    populateContent(price, data.price);
    populateContent(description, data.description);
    addColors(data);
  })
  .catch(function (err) {
    console.log(err);
  });

// Mapping function from API data (unique product)
function createContent(datas) {
  const productImg = `<img src="${datas.imageUrl}" alt="${datas.altTxt}">`;
  image.insertAdjacentHTML("beforeend", productImg);
}
// Populating function for HTML text
function populateContent(selector, content) {
  selector.innerHTML = content;
}

// Creating html element & add attribute and value
function createElement(htmlElement, attribute, attrValue, textValue, appendTo) {
  let element = document.createElement(htmlElement);
  if (attribute && attrValue) {
    element.setAttribute(attribute, attrValue);
  }
  if (textValue) {
    element.innerHTML = textValue;
  }
  if (appendTo) {
    appendTo.appendChild(element);
  }
}

// Adding all colors
function addColors(data) {
  for (let i = 0; i < data.colors.length; i++) {
    createElement("option", "value", data.colors[i], data.colors[i], colors);
  }
}
