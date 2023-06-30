let checkBoxDarkMode = document.getElementById('lightSwitch');

checkBoxDarkMode.addEventListener('change', setDarkMode);

window.addEventListener('DOMContentLoaded', function() {
  let theme = localStorage.getItem("theme");
  if (theme === "dark") {
    checkBoxDarkMode.checked = true;
    setDarkMode();
  }
});

export default function setDarkMode() {
  let isDark = checkBoxDarkMode.checked;
  let navbar = document.querySelector(".navbar");
  let navLink = document.querySelectorAll(".nav-link-1");
  let callmeForm = document.querySelector(".phone-input");
  let landmarks = document.querySelectorAll(".card");
  let lightbulb = document.querySelector(".fa-lightbulb");
  let toggleBtn = document.querySelector(".navbar-toggler-icon");
  let footer = document.querySelector(".footer");
  
  if (isDark) {
      document.body.classList.add("bg-dark");
      window.localStorage.setItem("theme", "dark");
      document.getElementById("lightSwitch").setAttribute("checked", "checked");
      navbar.classList.remove("bg-light");
      navLink.forEach((menu) => menu.classList.add("text-white"));
      callmeForm.classList.add("bg-dark", "text-white");
      lightbulb.classList.add("text-white"),
      toggleBtn.classList.add("text-white"),
      landmarks.forEach((card) => {
          card.classList.add("text-white", "bg-dark"); 
      });
      footer.classList.remove("bg-light");
      } 
  else {
    document.body.classList.remove("bg-dark");
      localStorage.setItem("theme", "light");
      navbar.classList.add("bg-light");
      navLink.forEach((menu) => menu.classList.remove("text-white"));
      callmeForm.classList.remove("bg-dark", "text-white");
      lightbulb.classList.remove("text-white"),
      toggleBtn.classList.remove("text-white"),
      landmarks.forEach((card) => {
          card.classList.remove("text-white", "bg-dark"); 
      });
      footer.classList.add("bg-light");
  }
}