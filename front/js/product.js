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

// Create listener for addToCart
addToCart.addEventListener("click", function () {
  addItemToCart();
});

// Getting product from API
let data;
// Get data from single object from API
fetch(`${serverUrl}${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    // Add content to page
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
function createElement(htmlElement, appendTo, textValue, attribute, attrValue) {
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
    createElement("option", colors, data.colors[i], "value", data.colors[i]);
  }
}

// Populating Local Storage
function addItemToCart() {
  // Get values from localStorage
  let existingStorage = JSON.parse(window.localStorage.getItem("allCouches"));
  if (existingStorage == null) {
    existingStorage = [];
  }
  // Define variable to modify string to number
  let parsedQuantity = parseInt(quantity.value);
  // Create object with datas from selected item
  let object = {
    id: data._id,
    color: colors.value,
    quantity: parsedQuantity,
  };
  // Check if options are selected
  if (object.color === "" || object.quantity == 0) {
    alert("Veuillez sélectionner une couleur et/ou renseigner une quantité");
  } else {
    // Check if element exists in localStorage
    if (existingStorage.find((element) => element.color === object.color)) {
      // Get index of existing element in localStorage
      let indexValue = existingStorage.findIndex(
        (element) => element.color === object.color
      );
      // Increment value of stored element
      existingStorage[indexValue].quantity += object.quantity;
      // Update localStorage with incremented value
      window.localStorage.setItem(
        "allCouches",
        JSON.stringify(existingStorage)
      );
    } else {
      // Add object to localStorage
      existingStorage.push(object);
      window.localStorage.setItem(
        "allCouches",
        JSON.stringify(existingStorage)
      );
    }
  }
}
