import { validateEmail, validatePassword } from "../../helper/helper.js";
import { data } from "../../helper/constants.js";

const users = JSON.parse(localStorage.getItem("users"));
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const login = document.getElementById("login");
const forgotPassword = document.getElementById("forgot-password");

function loginUser() {
  if (!validateEmail(userEmail.value)) {
    alert("wrong email");
    return;
  }
  if (!validatePassword(userPassword.value)) {
    alert("wrong password");
    return;
  }
  let user = users.find((user) => user.email === userEmail.value);
  if (user && String(user.password) === userPassword.value) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location = "/pages/home/home.html";
  } else {
    alert("user not found!!");
  }
}

login.addEventListener("click", loginUser);

forgotPassword.addEventListener("click", () => {
  if (userEmail.value.trim().length === 0) {
    alert("invalid email");
    return;
  }
  let user = users.find((user) => user.email === userEmail.value);
  if (!user) {
    alert("user not found");
    return;
  }
  localStorage.setItem("resetEmail", JSON.stringify(userEmail.value));
  let params = {
    name: "user",
    email: userEmail.value,
  };
  const serviceId = data.serviceId;
  const template_id = data.template_id_reset;
  emailjs
    .send(serviceId, template_id, params)
    .then((res) => {
      console.log(res);
      alert("email sent");
    })
    .catch((err) => console.log(err));
});

if (localStorage.getItem("loggedInUser")) {
  window.location = "/pages/home/home.html";
}
