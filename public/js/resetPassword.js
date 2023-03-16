const resetForm = document.querySelector('.reset-password-form');

resetForm.addEventListener('submit', function(e) { 
    e.preventDefault();
    const password = document.getElementById('register-password-reset').value;
    const confirmPassword = document.getElementById('re-register-password-reset').value;
    if(password !== confirmPassword){
        alert('Passwords do not match');
        return
    } 
    fetch('/users/resetPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email})
    }).then((resp) => resp.text()).then((data) => {
        alert(data);
    });
})