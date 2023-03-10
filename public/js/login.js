let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');
const forgottenLink = document.querySelector('.forgotten-link');
const forgottenTab = document.querySelector('#forgotten-password-tab-pane');
const forgotPassForm = document.querySelector('.forgotten-password-form');
const resetPasswordForm = document.querySelector('.reset-password-form');
const resetPasswordTab = document.querySelector('.reset-password-tab');


//Display hidden tab when click in the link 'forgot email?'

forgottenLink.addEventListener('click', (event) => {
    event.preventDefault(); 
    forgottenTab.classList.add('show', 'active');
    document.querySelector('.fogotten-password-tab').classList.remove('d-none');
    document.querySelector('#sign-in-tab').classList.add('d-none');
    document.querySelector('#register-tab').classList.add('d-none');
    document.querySelector('.sign-in-form').classList.add('d-none');
  });

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
            alert('Your password and email do not match. Please try again.')
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

//Request Reset Password - Setting endpoint

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
        body:JSON.stringify({email})
    }).then((resp) => resp.text()).then((data) => {
        alert(data);
        window.location.reload();
    });
})


