const resetForm = document.querySelector('.reset-password-form');

resetForm.addEventListener('submit', function(e) { 
    e.preventDefault();
    const queryParameters = new URLSearchParams(window.location.search);
    const userId = queryParameters.get("id");
    const token = queryParameters.get("token");
    const password = document.getElementById('register-password-reset').value;
    const confirmPassword = document.getElementById('re-register-password-reset').value;
    
    if(!password || !confirmPassword){
        alert('Choose a password !');
        return;
    }if(password !== confirmPassword){
        alert('The password doestn match, please try again!');
        return;
    } 
    fetch('/users/resetPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({password, token, userId})
    }).then((resp) => resp.text()).then((data) => {
        alert(data);
        window.location.href = '/login';
    });
})

function setDarkMode() {
    let isDark = document.body.classList.toggle("bg-dark");
    let navbar = document.querySelector(".navbar");
    let adminHeader = document.querySelector(".admin-header");
    let logo = document.querySelector(".navbar-brand")
    let callmeForm = document.querySelector(".phone-input");
    let boxBody = document.querySelector(".box-body");
    let passTitle = document.querySelectorAll(".password-title");
    let passInput = document.querySelectorAll(".input-password");
    
    if (isDark) {
        window.localStorage.setItem("theme", "dark");
        document.getElementById("lightSwitch").setAttribute("checked", "checked");
        navbar.classList.remove("bg-light", "navbar-light");
        adminHeader.classList.add("text-white");
        callmeForm.classList.add("bg-dark", "text-white");
        boxBody.classList.remove("bg-body");
        logo.classList.add("text-white");
        passTitle.forEach((title) => title.classList.add("text-white"));
        passInput.forEach((input) => input.classList.add("bg-dark", "text-white"));
        } 
    else {
        localStorage.setItem("theme", "light");
        navbar.classList.add("bg-light", "navbar-light");
        adminHeader.classList.remove("text-white");
        callmeForm.classList.remove("bg-dark", "text-white");
        boxBody.classList.add("bg-body");
        logo.classList.remove("text-white");
        passTitle.forEach((title) => title.classList.remove("text-white"));
        passInput.forEach((input) => input.classList.remove("bg-dark", "text-white"));
    }
}

function initializeDarkMode() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    setDarkMode();
  }
}

initializeDarkMode();