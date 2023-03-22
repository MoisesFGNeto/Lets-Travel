const forgotPassForm = document.querySelector('.forgotten-password-form');

forgotPassForm.addEventListener('submit', function(e) { 
    e.preventDefault();
    const email = document.querySelector('.forgotten-password-input').value;
    if(email === ''){
        alert('Please enter your email');
        return
    } 

    fetch('/users/requestPasswordReset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email: email})
    }).then((resp) => resp.text()).then((data) => {
        console.log(data);
        alert(data);
        window.location.reload();
    });
})

function setDarkMode() {
    let isDark = document.body.classList.toggle("bg-dark");
    let navbar = document.querySelector(".navbar");
    let adminHeader = document.querySelector(".admin-header");
    let logo = document.querySelector(".navbar-brand")
    let callmeForm = document.querySelector(".phone-input");
    let boxBody = document.querySelector(".box-body");
    let email = document.querySelector(".email-title");
    let emailInput = document.querySelector(".forgotten-password-input");
    
    if (isDark) {
        window.localStorage.setItem("theme", "dark");
        document.getElementById("lightSwitch").setAttribute("checked", "checked");
        navbar.classList.remove("bg-light", "navbar-light");
        adminHeader.classList.add("text-white");
        callmeForm.classList.add("bg-dark", "text-white");
        boxBody.classList.remove("bg-body");
        logo.classList.add("text-white");
        email.classList.add("text-white");
        emailInput.classList.add("bg-dark", "text-white");
        } 
    else {
        localStorage.setItem("theme", "light");
        navbar.classList.add("bg-light", "navbar-light");
        adminHeader.classList.remove("text-white");
        callmeForm.classList.remove("bg-dark", "text-white");
        boxBody.classList.add("bg-body");
        logo.classList.remove("text-white");
        email.classList.remove("text-white");
        emailInput.classList.remove("bg-dark", "text-white");
    }
}

function initializeDarkMode() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    setDarkMode();
  }
}

initializeDarkMode();
