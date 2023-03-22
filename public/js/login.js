let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

  // Sign-in form

signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.querySelector('#sign-in-email').value;
    let password = document.querySelector('#sign-in-password').value;
    if (email.trim() === "" || password.trim() === "") {
        alert("Please enter both email and password.");
        return;
    }
    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, password})
    }).then((resp) => resp.json()).then((data) => {
        let redirectURL = data.redirectURL;
        if(redirectURL) {
            window.location.href = redirectURL;
        } else {
            alert('Your password and email do not match. Please try again.');
        }
    });
})

//Register Form - Setting endpoint

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.querySelector('#sign-in-name').value;
    let email = document.querySelector('#register-email').value;
    let password = document.querySelector('#register-password').value;
    let rePassword = document.querySelector('#register-re-enter-password').value;

    if(!password || !rePassword){
        alert('Is not possible register without credentials. Please, choose a password!');
        return;
    }if(password !== rePassword){
        alert('The password doestn match, please try again!');
        return
    }if (email ===''){
        alert('Please insert your email');
        return;
    }if (name ===''){
        alert('Please insert your name');
        return;
    }
    fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({name, email, password})
    }).then((resp) => resp.text()).then((data) => {
        alert(data);
        window.location.reload();
    });  
})

// Dark Mode

function setDarkMode() {
    let isDark = document.body.classList.toggle("darkmode");
    let navbar = document.querySelector(".navbar");
    let logo = document.querySelector(".navbar-brand")
    let callmeForm = document.querySelector(".phone-input");
    let boxBody = document.querySelector(".box-body");
    let passInput = document.querySelectorAll(".input-password");
    
    if (isDark) {
        window.localStorage.setItem("theme", "dark");
        document.getElementById("lightSwitch").setAttribute("checked", "checked");
        navbar.classList.remove("bg-light");
        callmeForm.classList.add("bg-dark", "text-white");
        boxBody.classList.remove("bg-body");
        logo.classList.add("text-white");
        passInput.forEach((input) => input.classList.add("bg-dark", "text-white"));
        } 
    else {
        localStorage.setItem("theme", "light");
        navbar.classList.add("bg-light");
        callmeForm.classList.remove("bg-dark", "text-white");
        boxBody.classList.add("bg-body");
        logo.classList.remove("text-white");
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
