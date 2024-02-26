import { addToCart, removeItem } from "../../helper/helper.js";
import { data } from "../../db/db.js";

var products = [];
var cart = [];
var users;
var loggedUser;
const productContainer = document.getElementById("product-container");
const logOut = document.getElementsByClassName("logout-button");
logOut[0].addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location = "/";
});
function increaseCart(e) {
  console.log(e.target.dataset.id);
  products = JSON.parse(localStorage.getItem("products"));
  //   if (localStorage.getItem("cart"))
  //     cart = JSON.parse(localStorage.getItem("cart"));
  users = JSON.parse(localStorage.getItem("users"));
  loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  cart = loggedUser.cart;
  const data = addToCart(parseInt(e.target.dataset.id), products, cart);
  loggedUser.cart = data;
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == loggedUser.userId) {
      users[i].cart = data;
    }
  }
  console.log(users);
  localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
  localStorage.setItem("users", JSON.stringify(users));
  loadProducts();
}
function decreaseCart(e) {
  console.log(e.target.dataset.id);
  products = JSON.parse(localStorage.getItem("products"));
  //   if (localStorage.getItem("cart"))
  //     cart = JSON.parse(localStorage.getItem("cart"));
  users = JSON.parse(localStorage.getItem("users"));
  loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  cart = loggedUser.cart;
  const data = removeItem(parseInt(e.target.dataset.id), products, cart);
  loggedUser.cart = data;
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == loggedUser.userId) {
      users[i].cart = data;
    }
  }
  console.log(users);
  localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
  localStorage.setItem("users", JSON.stringify(users));
  loadProducts();
}

function loadProducts() {
  productContainer.innerHTML = "";
  products = products = JSON.parse(localStorage.getItem("products"));
  loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  cart = loggedUser.cart;
  cart
    .map((product) => {
      const productDiv = document.createElement("div");
      productDiv.setAttribute("class", "product");

      const img_container = document.createElement("div");
      img_container.setAttribute("class", "img-container");
      const image = document.createElement("img");
      image.setAttribute("src", `${product.images[0]}`);
      img_container.appendChild(image);

      const h2 = document.createElement("h2");
      h2.innerHTML = `${product.title}`;
      h2.setAttribute("class", "title");

      const updateQuantity = document.createElement("div");
      updateQuantity.setAttribute("class", "update-quantity");
      const decrease = document.createElement("button");
      decrease.setAttribute("class", "decrease");
      decrease.dataset.id = `${product.id}`;
      decrease.innerText = "-";
      decrease.addEventListener("click", decreaseCart);
      const quantity = document.createElement("div");
      quantity.setAttribute("class", "quantity");
      quantity.innerText = `${product.quantity}`;
      const increase = document.createElement("button");
      increase.setAttribute("class", "increase");
      increase.dataset.id = `${product.id}`;
      increase.innerText = "+";
      increase.addEventListener("click", increaseCart);
      updateQuantity.append(decrease, quantity, increase);

      const price = document.createElement("h3");
      price.setAttribute("class", "price");
      price.innerHTML = `$${product.price * product.quantity}`;

      const productInfo = document.createElement("div");
      productInfo.classList.add("flex");
      productInfo.append(img_container, updateQuantity);

      const productInfoPrice = document.createElement("div");
      productInfoPrice.classList.add("flex");
      productInfoPrice.append(h2, price);

      productDiv.append(productInfo, productInfoPrice);
      productContainer.appendChild(productDiv);
    })
    .join("");

  let count = 0;
  let total = 0;
  for (let product of cart) {
    // count += product.quantity;
    count += 1;
    total += parseInt(product.quantity) * parseInt(product.price);
  }
  const quantity = document.getElementById("quantity");
  quantity.innerText = count;
  const totalPrice = document.getElementById("total-price-text");
  totalPrice.innerText = "$" + total;
  console.log(count + " " + count + " " + total);
}

if (!localStorage.getItem("loggedInUser")) {
  window.location = "/pages/register/register.html";
}

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(data));
}
loadProducts();
