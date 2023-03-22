async function getPosts() {
    return await fetch('/posts')
        .then((response) => response.json())
        .then((data) => data);
}

let callMeForm = document.querySelector('.call-me-form');

document.addEventListener('DOMContentLoaded', async function() {
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `
            <div class="div-card col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <a href="/landmark?id=${post.id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
        `;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
})

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
    }).then((resp) => resp.text()).then(() => alert('We will call you back as soon as possible!'));
})

let emailRequestForm = document.querySelector('.email-request-form');

emailRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email-contact');
    const messageInput = document.querySelector('#message');

    if(!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill in all the required fields.');
        return;
    }

    fetch('/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email: document.querySelector('#email-contact').value,
            text: document.querySelector('#message').value
        })
    }).then((resp) => resp.text()).then(() => alert('Your message has been sent, Thank You !'));
})


// Dark Mode

function setDarkMode() {
    let isDark = document.body.classList.toggle("darkmode");
    let navbar = document.querySelector(".navbar");
    let callmeForm = document.querySelector(".phone-input");
    let landmarks = document.querySelectorAll(".card");
    let footer = document.querySelector(".footer");
    let navLink = document.querySelectorAll(".nav-link");

    if (isDark) {
        window.localStorage.setItem("theme", "dark");
        document.getElementById("lightSwitch").setAttribute("checked", "checked");
        navbar.classList.remove("bg-light");
        callmeForm.classList.add("bg-dark", "text-white");
        landmarks.forEach((card) => card.classList.add("darkmode"));
        footer.classList.remove("bg-light");
        navLink.forEach((menu) => menu.classList.add("text-white"));
        } 
    else {
        localStorage.setItem("theme", "light");
        navbar.classList.add("bg-light");
        callmeForm.classList.remove("bg-dark", "text-white");
        landmarks.forEach((card) => card.classList.remove("darkmode"));
        footer.classList.add("bg-light");
        navLink.forEach((menu) => menu.classList.remove("text-white"));
    }
}

function initializeDarkMode() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    setDarkMode();
  }
}

initializeDarkMode();
