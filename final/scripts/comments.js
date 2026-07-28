const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (localStorage.getItem('comments') != null) {
        const comments = localStorage.getItem('comments')
        let commentsParsed = JSON.parse(comments)
        const newValue = [form.elements['place'].value, form.elements['date'].value, form.elements['comment'].value]
        commentsParsed.push(newValue)
        localStorage.setItem('comments', JSON.stringify(commentsParsed))
    } else {
        const newValue = [form.elements['place'].value, form.elements['date'].value, form.elements['comment'].value]
        localStorage.setItem('comments', JSON.stringify([newValue]))
    }
    
})