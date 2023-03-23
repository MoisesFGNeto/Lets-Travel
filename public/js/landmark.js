let callMeForm = document.querySelector('.call-me-form');

callMeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let phoneInput = callMeForm.querySelector('input');
    if (phoneInput.value.trim() === '') {
        alert('Please enter a phone number.');
        return;
    }
    if (isNaN(phoneInput.value)) {
        alert('Please enter only numbers for the phone number.');
        return;
    }
    fetch('/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    }).then((resp) => resp.text()).then(() => {
        alert('We will call you back as soon as possible!');
        location.reload();
    });
})

function setDarkMode() {
    let isDark = document.body.classList.toggle("bg-dark");
    let navbar = document.querySelector(".navbar");
    let logo = document.querySelector(".navbar-brand");
    let navLink = document.querySelectorAll(".nav-item");
    let callmeForm = document.querySelector(".phone-input");
    let landmarks = document.querySelectorAll(".card");
    let landmarkText = document.querySelectorAll(".card-body");
    let footer = document.querySelector(".footer");
    let boxContainer = document.querySelector(".box-body");

    if (isDark) {
        window.localStorage.setItem("theme", "dark");
        document.getElementById("lightSwitch").setAttribute("checked", "checked");
        navbar.classList.remove("bg-light");
        logo.classList.add("text-white");
        navLink.classList.add("text-white");
        callmeForm.classList.add("bg-dark", "text-white");
        landmarks.forEach((card) => card.classList.add("darkmode"));
        landmarkText.forEach((card) => card.classList.add("text-white"));
        footer.classList.remove("bg-light");
        boxContainer.classList.remove("bg-body");
        logo.classList.add("text-white");
        } 
    else {
        localStorage.setItem("theme", "light");
        navbar.classList.add("bg-light");
        logo.classList.remove("text-white");
        navLink.classList.remove("text-white");
        callmeForm.classList.remove("bg-dark", "text-white");
        landmarks.forEach((card) => card.classList.remove("darkmode"));
        landmarkText.forEach((card) => card.classList.add("text-white"));
        footer.classList.add("bg-light");
        boxContainer.classList.add("bg-body");
        logo.classList.remove("text-white");
    }
}

function initializeDarkMode() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    setDarkMode();
  }
}

initializeDarkMode();
