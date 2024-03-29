let createForm = document.querySelector('.create-post-form');
let title = document.querySelector('#title');
let country = document.querySelector('#country');
let imageURL = document.querySelector('#imageURL');
let text = document.querySelector('#text');
let imageFile = document.querySelector('#image-file');

createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!imageFile.files.length) {
        alert('Please select an image.');
        return;
    }
    if (title.value.trim() === '' || country.value.trim() === '' || text.value.trim() === ''){
        alert('Please fill all required fields');
        return;
    }
    let createText = text.value;
    let createDrescription;
    if(createText.indexOf('.') === -1){
        createDrescription = createText;
    }else {
        createDrescription = createText.substring(0, createText.indexOf('.') + 1);
    }
    let data = new FormData();
    data.append('title', title.value);
    data.append('country', country.value);
    data.append('imageURL', imageURL.value);
    data.append('text', createText);
    data.append('description', createDrescription);
    data.append('imageFile', imageFile.files[0]);
    fetch('/posts/', {
        method: 'POST',
        body: data
    }).then ((response) => response.text()).then((data) => window.history.go());
}) 

function disableInput(input1, input2) {
    if(input1.value) {
        input2.disabled = true;
    } else {
        input2.disabled = false;
    }
}
imageURL.addEventListener('change', () => disableInput(imageURL, imageFile));
imageFile.addEventListener('change', () => disableInput(imageFile, imageURL));

