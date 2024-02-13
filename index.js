if (localStorage.getItem("loggedInUser")) {
  window.location = "/pages/home/home.html";
} else {
  window.location = "/pages/register/register.html";
}
