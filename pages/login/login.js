import { validateEmail, validatePassword } from "../../helper/helper.js";

const users = JSON.parse(localStorage.getItem("users"));
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const login = document.getElementById("login");
login.addEventListener("click", loginUser);

function loginUser() {
  console.log(users);
  let user = users.find((user) => user.email === userEmail.value);
  if (user && String(user.password) === userPassword.value) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location = "/pages/home/home.html";
  } else {
    alert("user not found!!");
  }
}

if (localStorage.getItem("loggedInUser")) {
  window.location = "/pages/home/home.html";
}
