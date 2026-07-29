const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (localStorage.getItem('comments') != null) {
        const comments = localStorage.getItem('comments')
        let commentsParsed = JSON.parse(comments)
        const newValue = [form.elements['name'].value, form.elements['place'].value, form.elements['date'].value, form.elements['comment'].value]
        commentsParsed.push(newValue)
        localStorage.setItem('comments', JSON.stringify(commentsParsed))
    } else {
        const newValue = [form.elements['name'].value, form.elements['place'].value, form.elements['date'].value, form.elements['comment'].value]
        localStorage.setItem('comments', JSON.stringify([newValue]))
    }
    displayComments()
})

const comments = document.querySelector('.comments')
function displayComments() {
    comments.innerHTML = '';
    const elements = localStorage.getItem('comments')
    const parsedElements = JSON.parse(elements)
    parsedElements.forEach(comment => {
        const div = document.createElement('div')
        const name = document.createElement('p')
        const place = document.createElement('p')
        const date = document.createElement('p')
        const commnt = document.createElement('p')
        name.innerHTML = `Name: <strong>${comment[0]}</strong>`;
        place.innerHTML = `Place: <strong>${comment[1]}</strong>`;
        date.innerHTML = `Date: <strong>${comment[2]}</strong>`;
        commnt.innerHTML = `<strong>${comment[3]}</strong>`;
        div.appendChild(name)
        div.appendChild(place)
        div.appendChild(date)
        div.appendChild(commnt)
        comments.appendChild(div)
    });
}
displayComments()