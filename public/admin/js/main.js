async function getPosts(){
    return await fetch('/posts')
        .then((response) => response.json())
        .then((data) => data);
}
async function getCallbackRequests(){
    return await fetch('/callback-requests')
        .then((response) => response.json())
        .then((data) => data);
}
async function getEmails(){
    return await fetch('/emails')
        .then((response) => response.json())
        .then((data) => data);
}

document.addEventListener('DOMContentLoaded', async function () {
    addPost();
    addCallbackRequests();
    addEmails();

    // CREAT POST
    let addPostBtn = document.querySelector('.add-post');
    let creatPostBtn = document.querySelector('#v-pills-add-post-tab');
    addPostBtn.addEventListener('click', () => creatPostBtn.click());
})

async function addPost(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles-list tbody');
    articles.innerHTML = '';
    let i = 1;
    posts.forEach((post) => {
        let postHTML = `
        <tr>
            <td>${i++}<input class="id" type="hidden" value="${post.id}"></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button class="edit-btn btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
         `;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
}

async function addCallbackRequests(){
    let requests = await getCallbackRequests();
    let requestsBlock = document.querySelector('#v-pills-requests tbody');
    requestsBlock.innerHTML = '';
    let i = 1;
    requests.forEach((request) => {
        let requestHTML = `
        <tr>
             <td>${i++}<input class="id" type="hidden" value="${request.id}"></td>
             <td class="title">${request.phoneNumber}</td>
             <td class="date">${request.date}</td>
             <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
         `;
        requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
}

async function addEmails(){
    let emails = await getEmails();
    let emailsBlock = document.querySelector('#v-pills-mails tbody');
    emailsBlock.innerHTML = '';
    let i = 1;
    emails.forEach((email) => {
        let emailHTML = `
        <tr>
             <td>${i++}<input class="id" type="hidden" value="${email.id}"></td>
             <td class="name">${email.name}</td>
             <td class="email">${email.email}</td>
             <td class="date">${email.date}</td>
             <td><button class="remove-btn btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        <tr>
            <td colspan="5" class="text">${email.text}</td>
        </tr>

         `;
        emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
    })
}

let requestsBlock = document.querySelector('#v-pills-requests');

requestsBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('remove-btn')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/callback-requests/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
        .then(() => window.history.go());
    }
})

let emailsBlock = document.querySelector('#v-pills-mails');

emailsBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('remove-btn')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/emails/' + id, {
            method: 'DELETE'
        }).then((response) => response.text())
        .then(() => window.history.go());
    }
})

let logOutBtn = document.querySelector('.log-out-btn');

logOutBtn.addEventListener('click', function () {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})

function setDarkMode() {
    let isDark = document.body.classList.toggle("darkmode");
    let navbar = document.querySelector(".navbar");
    let callmeForm = document.querySelector(".phone-input");
    let navMenu = document.querySelectorAll(".nav-menu");
    let logo = document.querySelector(".navbar-brand");
    let adminBox = document.querySelector(".admin-box");
    let articles = document.querySelector('.table tbody');
    let tables = document.querySelectorAll(".table");

    if (isDark) {
        window.localStorage.setItem("theme", "dark");
        document.getElementById("lightSwitch").setAttribute("checked", "checked");
        navbar.classList.remove("bg-light");
        callmeForm.classList.add("bg-dark", "text-white");
        navMenu.forEach((menu) => menu.classList.add("text-white"));
        logo.classList.add("text-white");
        adminBox.classList.remove("bg-body");
        articles.classList.add("table-dark");
        tables.forEach((table) => table.classList.add("table-dark"));
        }
    else {
        localStorage.setItem("theme", "light");
        navbar.classList.add("bg-light");
        navbar.classList.remove("font-white");
        callmeForm.classList.remove("bg-dark", "text-white");
        navMenu.forEach((menu) => menu.classList.remove("text-white"));
        logo.classList.remove("text-white");
        adminBox.classList.add("bg-body");
        articles.classList.remove("table-dark");
        tables.forEach((table) => table.classList.remove("table-dark"));
      }
    }

function initializeDarkMode() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    setDarkMode();
  }
}

initializeDarkMode();