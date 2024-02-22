import { addToCart, removeItem } from "../../helper/helper.js";
import { data } from "../../db/db.js";

let carouselCount = 0;
let products = [];
let cart = [];
let users;
let loggedUser;
let searchWord = "";
let maxPrice = 2000;
const productContainer = document.getElementById("product-container");
const cartBtn = document.getElementById("cart-quantity");
const logOut = document.getElementsByClassName("logout-button");
const userInfo = document.getElementById("user-info");
const search = document.getElementById("search-bar");
const sortParam = document.getElementById("sort");
const slider = document.getElementById("slider");
const maxPriceSpan = document.getElementById("max-price");

logOut[0].addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location = "/";
});

function loadProducts() {
  productContainer.innerHTML = "";
  products = JSON.parse(localStorage.getItem("products"));
  users = JSON.parse(localStorage.getItem("users"));
  loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  userInfo.innerText = "Hello, " + loggedUser.name;
  cart = loggedUser.cart;
  products
    .map((product) => {
      const product_div = document.createElement("div");
      product_div.setAttribute("class", "product");
      const img_container = document.createElement("div");
      img_container.setAttribute("class", "img-container");
      const img = document.createElement("img");
      img.setAttribute("src", `${product.images[0]}`);
      img_container.appendChild(img);
      product_div.appendChild(img_container);
      const h2 = document.createElement("h2");
      h2.setAttribute("class", "title");
      h2.innerText = `${product.title}`;
      const h3 = document.createElement("h3");
      h3.setAttribute("class", "price");
      h3.innerText = `$${product.price}`;
      product_div.append(h2, h3);
      const cart_item = cart.find((ele) => ele.id == product.id);
      if (cart_item && cart_item.quantity > 0) {
        const updateQuantity = document.createElement("div");
        updateQuantity.setAttribute("class", "update-quantity");
        const decrease = document.createElement("button");
        decrease.setAttribute("class", "decrease");
        decrease.dataset.id = `${product.id}`;
        decrease.innerText = "-";
        decrease.addEventListener("click", decreaseCart);
        const quantity = document.createElement("div");
        quantity.setAttribute("class", "quantity");
        quantity.innerText = `${cart_item.quantity}`;
        const increase = document.createElement("button");
        increase.setAttribute("class", "increase");
        increase.dataset.id = `${product.id}`;
        increase.innerText = "+";
        increase.addEventListener("click", increaseCart);
        updateQuantity.append(decrease, quantity, increase);
        product_div.append(updateQuantity);
      } else {
        const addButton = document.createElement("button");
        addButton.setAttribute("class", "add-to-cart");
        addButton.dataset.id = `${product.id}`;
        addButton.innerText = "Add to Cart";
        addButton.addEventListener("click", increaseCart);
        product_div.append(addButton);
      }
      productContainer.appendChild(product_div);
    })
    .join("");

  let count = 0;
  count = cart.length;
  cartBtn.innerText = count;
}
function filterProducts() {
  let filterCount = 0;
  productContainer.innerHTML = "";
  products = JSON.parse(localStorage.getItem("products"));
  users = JSON.parse(localStorage.getItem("users"));
  loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  userInfo.innerText = "Hello, " + loggedUser.name;
  cart = loggedUser.cart;
  if (searchWord.length > 0) {
    products
      .map((product) => {
        if (product.price <= maxPrice) {
          if (
            searchWord.length > 0 &&
            product.title.toLowerCase().includes(searchWord.toLowerCase())
          ) {
            console.log(typeof product.price);
            filterCount++;
            const product_div = document.createElement("div");
            product_div.setAttribute("class", "product");
            const img_container = document.createElement("div");
            img_container.setAttribute("class", "img-container");
            const img = document.createElement("img");
            img.setAttribute("src", `${product.images[0]}`);
            img_container.appendChild(img);
            product_div.appendChild(img_container);
            const h2 = document.createElement("h2");
            h2.setAttribute("class", "title");
            h2.innerText = `${product.title}`;
            const h3 = document.createElement("h3");
            h3.setAttribute("class", "price");
            h3.innerText = `$${product.price}`;
            product_div.append(h2, h3);
            const cart_item = cart.find((ele) => ele.id == product.id);
            if (cart_item && cart_item.quantity > 0) {
              const updateQuantity = document.createElement("div");
              updateQuantity.setAttribute("class", "update-quantity");
              const decrease = document.createElement("button");
              decrease.setAttribute("class", "decrease");
              decrease.dataset.id = `${product.id}`;
              decrease.innerText = "-";
              decrease.addEventListener("click", decreaseCart);
              const quantity = document.createElement("div");
              quantity.setAttribute("class", "quantity");
              quantity.innerText = `${cart_item.quantity}`;
              const increase = document.createElement("button");
              increase.setAttribute("class", "increase");
              increase.dataset.id = `${product.id}`;
              increase.innerText = "+";
              increase.addEventListener("click", increaseCart);
              updateQuantity.append(decrease, quantity, increase);
              product_div.append(updateQuantity);
            } else {
              const addButton = document.createElement("button");
              addButton.setAttribute("class", "add-to-cart");
              addButton.dataset.id = `${product.id}`;
              addButton.innerText = "Add to Cart";
              addButton.addEventListener("click", increaseCart);
              product_div.append(addButton);
            }
            productContainer.appendChild(product_div);
          }
        }
      })
      .join("");
  } else {
    products
      .map((product) => {
        if (product.price <= maxPrice) {
          console.log(typeof product.price);
          filterCount++;
          const product_div = document.createElement("div");
          product_div.setAttribute("class", "product");
          const img_container = document.createElement("div");
          img_container.setAttribute("class", "img-container");
          const img = document.createElement("img");
          img.setAttribute("src", `${product.images[0]}`);
          img_container.appendChild(img);
          product_div.appendChild(img_container);
          const h2 = document.createElement("h2");
          h2.setAttribute("class", "title");
          h2.innerText = `${product.title}`;
          const h3 = document.createElement("h3");
          h3.setAttribute("class", "price");
          h3.innerText = `$${product.price}`;
          product_div.append(h2, h3);
          const cart_item = cart.find((ele) => ele.id == product.id);
          if (cart_item && cart_item.quantity > 0) {
            const updateQuantity = document.createElement("div");
            updateQuantity.setAttribute("class", "update-quantity");
            const decrease = document.createElement("button");
            decrease.setAttribute("class", "decrease");
            decrease.dataset.id = `${product.id}`;
            decrease.innerText = "-";
            decrease.addEventListener("click", decreaseCart);
            const quantity = document.createElement("div");
            quantity.setAttribute("class", "quantity");
            quantity.innerText = `${cart_item.quantity}`;
            const increase = document.createElement("button");
            increase.setAttribute("class", "increase");
            increase.dataset.id = `${product.id}`;
            increase.innerText = "+";
            increase.addEventListener("click", increaseCart);
            updateQuantity.append(decrease, quantity, increase);
            product_div.append(updateQuantity);
          } else {
            const addButton = document.createElement("button");
            addButton.setAttribute("class", "add-to-cart");
            addButton.dataset.id = `${product.id}`;
            addButton.innerText = "Add to Cart";
            addButton.addEventListener("click", increaseCart);
            product_div.append(addButton);
          }
          productContainer.appendChild(product_div);
        }
      })
      .join("");
  }
  if (filterCount === 0) {
    const noProduct = document.createElement("h2");
    noProduct.innerText = "No Products found";
    productContainer.appendChild(noProduct);
  }
  let count = 0;
  count = cart.length;
  cartBtn.innerText = count;
}
function sort(param) {
  products = JSON.parse(localStorage.getItem("products"));
  if (param === "lowToHigh") products.sort((a, b) => a.price - b.price);
  else products.sort((a, b) => b.price - a.price);
  localStorage.setItem("products", JSON.stringify(products));
  filterProducts();
}
function increaseCart(e) {
  products = JSON.parse(localStorage.getItem("products"));
  //   if (localStorage.getItem("cart"))
  //     cart = JSON.parse(localStorage.getItem("cart"));
  users = JSON.parse(localStorage.getItem("users"));
  loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  cart = loggedUser.cart;
  const data = addToCart(parseInt(e.target.dataset.id), products, cart);
  loggedUser.cart = data;
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == loggedUser.userId) {
      users[i].cart = data;
    }
  }
  localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
  localStorage.setItem("users", JSON.stringify(users));
  if (searchWord.length > 0) filterProducts();
  else loadProducts();
}
function decreaseCart(e) {
  products = JSON.parse(localStorage.getItem("products"));
  users = JSON.parse(localStorage.getItem("users"));
  loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  cart = loggedUser.cart;
  const data = removeItem(parseInt(e.target.dataset.id), products, cart);
  loggedUser.cart = data;
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId == loggedUser.userId) {
      users[i].cart = data;
    }
  }
  localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
  localStorage.setItem("users", JSON.stringify(users));
  if (searchWord.length > 0) filterProducts();
  else loadProducts();
}
search.addEventListener("input", (e) => {
  console.log(e.target.value);
  searchWord = e.target.value;
  filterProducts();
});
sortParam.addEventListener("change", (e) => {
  if (e.target.value === "lowToHigh") sort(e.target.value);
  else if (e.target.value === "highToLow") sort(e.target.value);
});
slider.addEventListener("input", (e) => {
  console.log(e.target.value);
  maxPriceSpan.innerText = "$" + e.target.value;
  maxPrice = e.target.value;
  filterProducts();
});
setInterval(() => {
  carouselCount++;
  console.log(carouselCount);
  document
    .getElementsByClassName(`carousel-item${(carouselCount - 1) % 3}`)[0]
    .classList.replace("active", "inactive");

  document
    .getElementsByClassName(`carousel-item${carouselCount % 3}`)[0]
    .classList.replace("inactive", "active");
}, 1500);
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(data));
  //   if (!localStorage.getItem("cart")) {
  //     localStorage.setItem("cart", []);
  //   }
}
if (!localStorage.getItem("loggedInUser")) {
  window.location = "/pages/register/register.html";
}
loadProducts();
