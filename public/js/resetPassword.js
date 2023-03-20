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