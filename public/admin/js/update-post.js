{
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector('#v-pills-update-post-tab');
    let updateForm = document.querySelector('.update-post-form');
    let id;
    let titleInput = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');
    let cancelBtn = document.querySelector('#cancel-btn');

    articlesBlock.addEventListener('click', async function(e) {
        if(e.target.classList.contains('edit-btn')) {
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('/posts/' + id)
                .then((response) => response.json())
                .then((data) => data)
            titleInput.value = postInfo.title;
            textArea.value = postInfo.text;
            updateBtn.click();
        }
    })

    updateForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        let updateDrescription;
        if(textArea.value.indexOf('.') === -1){
            updateDrescription = textArea.value;
        }else {
            updateDrescription = textArea.value.substring(0, textArea.value.indexOf('.') + 1);
        }
        fetch('/posts/' + id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.value,
                text: textArea.value,
                description: updateDrescription
            })
        }).then((res) => res.text()).then(() => window.history.go());
    })

    cancelBtn.addEventListener('click', function() {
         window.history.go()    
      })
}