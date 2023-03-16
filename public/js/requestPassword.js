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