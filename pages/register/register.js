import { validateEmail, validatePassword } from "../../helper/helper.js";
import { data } from "../../helper/constants.js";

const username = document.getElementById("name");
const useremail = document.getElementById("email");
const password = document.getElementById("password");
const otp = document.getElementById("otp");
const register = document.getElementById("register");
const getOtp = document.getElementById("sendOtp");

let users = [];
let generated_otp = 0;

getOtp.addEventListener("click", sendOtp);
register.addEventListener("click", registerUser);

if (localStorage.getItem("users")) {
  users = localStorage.getItem("users");
}

function sendOtp(e) {
  if (localStorage.getItem("users")) {
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find((user) => user.email === useremail.value);
    if (user) {
      alert("email already exist");
      return;
    }
  }
  if (validateEmail(useremail.value)) {
    generated_otp = Math.round(Math.random() * 100000);
    localStorage.setItem("otp", generated_otp);
    sendEmail(generated_otp);
  } else {
    alert("invalid email or password");
  }
}

function sendEmail(generated_otp) {
  let params = {
    name: username.value,
    email: useremail.value,
    otp: generated_otp,
  };
  const serviceId = data.serviceId;
  const template_id = data.template_id_otp;
  emailjs
    .send(serviceId, template_id, params)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function authenticateOtp() {
  if (JSON.parse(localStorage.getItem("otp")) === Number(otp.value))
    return true;
  else return false;
}

function registerUser() {
  if (authenticateOtp()) {
    if (!validatePassword(password.value)) {
      alert("invalid password");
      return;
    }
    const user = {
      userId: Math.round(Math.random() * 1000000),
      name: username.value,
      email: useremail.value,
      password: password.value,
      cart: [],
    };
    if (localStorage.getItem("users")) {
      users = JSON.parse(localStorage.getItem("users"));
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("registration successful");
    window.location = "/pages/login/login.html";
  } else {
    alert("Wrong otp");
  }
}

if (localStorage.getItem("loggedInUser")) {
  window.location = "/pages/home/home.html";
}
