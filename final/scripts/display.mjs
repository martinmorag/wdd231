export default function displayComments() {
    const comments = document.querySelector('.comments')

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