import { validateEmail, validatePassword } from "../../helper/helper.js";

const resetPassword = document.getElementById("password");
const resetButton = document.getElementById("reset");
const userEmail = JSON.parse(localStorage.getItem("resetEmail"));
const users = JSON.parse(localStorage.getItem("users"));

resetButton.addEventListener("click", () => {
  if (!validatePassword(resetPassword.value)) {
    alert("wrong password");
    return;
  }
  users.forEach((user, index) => {
    if (user.email === userEmail) {
      users[index].password = resetPassword.value;
    }
  });
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("resetEmail", "");
  window.location = "/pages/login/login.html";
});
