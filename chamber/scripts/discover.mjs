import places from '../data/places.mjs';

const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.getElementById("lastModified").innerHTML = document.lastModified;

const container = document.querySelector('#places')
const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
let count = 0;
for (let i = 0; i < places.length; i++) {
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const img = document.createElement('img')
    const button = document.createElement('button')
    button.textContent = 'Learn More'

    div.style.gridArea = abc[i];

    h2.textContent = places[i].name;
    p.innerHTML = `Address: ${places[i].address}`;
    img.setAttribute('src', `images/${places[i].image}`)
    img.setAttribute('alt', places[i].name)
    img.setAttribute('loading', 'lazy')
    button.addEventListener('click', () => displayPlaceDetails(places[i]))
    
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    container.appendChild(div)
}

const placeDetails = document.querySelector('#placeDetails')

function displayPlaceDetails(place) {
    placeDetails.innerHTML = '';
    placeDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h3>${place.name}</h3>
    <p>${place.address}</p>
    <p>${place.description}</p>
  `;
    placeDetails.showModal();

    const closeModal = document.querySelector('#closeModal');

    closeModal.addEventListener("click", () => {
        placeDetails.close();
    });
}



const visit = document.querySelector('#visit')

if (localStorage.getItem('visit') != null) {
    const storedDate = localStorage.getItem('visit')
    const diff = getDiffDays(new Date(storedDate), new Date())
    if (diff > 0) {
        visit.innerHTML = `You last visited ${diff} days ago.`
    } else {
        visit.textContent = 'Back so soon! Awesome!';
    }
    localStorage.setItem('visit', new Date().toString())
} else {
    localStorage.setItem('visit', new Date().toString())
    visit.textContent = 'Welcome! Let us know if you have any questions.';
}

function getDiffDays(a, b) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / msPerDay)
}



const getString = window.location.pathname;
const navItems = document.querySelectorAll('#nav-bar li')

if (getString === '/chamber/') {
    navItems[0].classList.add('current')
} else if (getString === '/chamber/directory.html') {
    navItems[1].classList.add('current')
} else if (getString === '/chamber/discover.html') {
    navItems[2].classList.add('current')
} else if (getString === '/chamber/join.html') {
    navItems[3].classList.add('current')
}
