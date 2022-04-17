// Creating variable for injecting items
const serverUrl = "http://localhost:3000/api/products/";
let storage = getLocalStorage();
// Creating variables for selectors
const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const order = document.getElementById("order");

// Creating variables for form selectors & error messages
const formFirstName = document.getElementById("firstName");
const formFirstNameError = document.getElementById("firstNameErrorMsg");
const formLastName = document.getElementById("lastName");
const formLastNameError = document.getElementById("lastNameErrorMsg");
const formAddress = document.getElementById("address");
const formAddressError = document.getElementById("addressErrorMsg");
const formCity = document.getElementById("city");
const formCityError = document.getElementById("cityErrorMsg");
const formEmail = document.getElementById("email");
const formEmailError = document.getElementById("emailErrorMsg");

// ********************************************************************************
// Getting data from API
// ********************************************************************************
let data;
fetch(serverUrl)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    data = value;
    getLocalStorage();
    createCartElement(storage, data);
    calculateTotal(storage, data);
    modifyProducts();
  })
  .catch(function (err) {
    console.log(err);
  });

// ********************************************************************************
// Get datas from localStorage
// ********************************************************************************
function getLocalStorage() {
  let existingStorage = JSON.parse(window.localStorage.getItem("allCouches"));
  if (existingStorage == null) {
    existingStorage = [];
  }
  return existingStorage;
}

// ********************************************************************************
// Create html element and add class if needed
// ********************************************************************************
function createHTML(htmlElement, classElement) {
  let element = document.createElement(htmlElement);
  if (classElement) {
    element.classList.add(classElement);
  }
  return element;
}

// ********************************************************************************
// Create cart element
// ********************************************************************************
function createCartElement(localStored, apiData) {
  // Loop through all localStorage elements
  for (let i = 0; i < localStored.length; i++) {
    // Create variable that matches element in cart and element in global API
    let apiElement = [...apiData].find(
      (element) => element._id === localStored[i].id
    );

    // Create H2 element for name
    const h2 = createHTML("h2");
    h2.innerHTML = apiElement.name;

    // Create p element for color
    const color = createHTML("p");
    color.innerHTML = localStored[i].color;

    // Create p element for price
    const price = createHTML("p");
    price.innerHTML = apiElement.price + " €";

    // Create div for item description and add html elements inside
    const divContentDescription = createHTML(
      "div",
      "cart__item__content__description"
    );
    divContentDescription.appendChild(h2);
    divContentDescription.appendChild(color);
    divContentDescription.appendChild(price);

    // Create p element for quantity
    const quantity = createHTML("p");
    quantity.innerHTML = "Qté : " + localStored[i].quantity;

    // Create input element for modifying quantity
    const input = createHTML("input", "itemQuantity");
    input.setAttribute("type", "number");
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", 1);
    input.setAttribute("max", 100);
    input.setAttribute("value", localStored[i].quantity);

    // Create div for item settings quantity & input modifier
    const divContentSettingsQuant = createHTML(
      "div",
      "cart__item__content__settings__quantity"
    );
    divContentSettingsQuant.appendChild(quantity);
    divContentSettingsQuant.appendChild(input);
    // Create p element for deleting item
    const deleteItem = createHTML("p", "deleteItem");
    deleteItem.innerHTML = "Supprimer";

    // Create div for item settings quantity delete
    const divContentSettingsDel = createHTML(
      "div",
      "cart__item__content__settings__delete"
    );
    divContentSettingsDel.appendChild(deleteItem);

    // Create div for item settings and add html elements inside
    const divContentSettings = createHTML(
      "div",
      "cart__item__content__settings"
    );
    divContentSettings.appendChild(divContentSettingsQuant);
    divContentSettings.appendChild(divContentSettingsDel);

    // Create div for item content
    const divContent = createHTML("div", "cart__item__content");
    divContent.appendChild(divContentDescription);
    divContent.appendChild(divContentSettings);

    // Create img element for image & alt
    const image = createHTML("img");
    image.setAttribute("src", apiElement.imageUrl);
    image.setAttribute("alt", apiElement.altTxt);

    // Create div for item image
    const divImage = createHTML("div", "cart__item__img");
    divImage.appendChild(image);

    // Create article for each item
    const article = createHTML("article", "cart__item");
    article.setAttribute("data-id", localStored[i].id);
    article.setAttribute("data-color", localStored[i].color);
    article.appendChild(divImage);
    article.appendChild(divContent);

    // Add each item to cart
    cartItems.appendChild(article);
  }
}
// ********************************************************************************
// Function to calculate number of items & total price
// ********************************************************************************
function calculateTotal(storage, apiData) {
  // Calculate total number of items
  const itemTotal = [...storage]
    .map((item) => item.quantity)
    .reduce((previousValue, currentValue) => previousValue + currentValue);
  totalQuantity.innerHTML = itemTotal;

  // Calculate total price
  let arrayPrice = [];

  // Loop through local storage
  for (let i = 0; i < storage.length; i++) {
    // Create variable that matches element in cart and element in global API
    let apiElement = [...apiData].find(
      (element) => element._id === storage[i].id
    );

    // Add prices to array
    arrayPrice.push(apiElement.price * storage[i].quantity);
  }

  // Sum of all prices in array
  const priceTotal = arrayPrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  totalPrice.innerHTML = priceTotal;
}

function modifyProducts() {
  // Create node list for each element in cart
  const itemQuantityInput = document.getElementsByClassName("itemQuantity");
  // Loop through all items that have the class "itemQuantity"
  [...itemQuantityInput].forEach((item) => {
    // Create variables for selecting parent node with attributes
    let articleItem = item.parentNode.parentNode.parentNode.parentNode;
    let articleItemIdAttr = articleItem.getAttribute("data-id");
    let articleItemColorAttr = articleItem.getAttribute("data-color");
    // Add event listener for each input
    item.addEventListener("change", (event) => {
      event.preventDefault();
      for (let i = 0; i < storage.length; i++) {
        // Check attributes
        if (
          storage[i].id === articleItemIdAttr &&
          storage[i].color === articleItemColorAttr
        ) {
          // Convert value into number and modify storage
          let parsedValue = parseInt(item.value);
          storage[i].quantity = parsedValue;
          // Set updated value to local Storage & reload page
          window.localStorage.setItem("allCouches", JSON.stringify(storage));
          location.reload();
        }
      }
    });
  });
}
