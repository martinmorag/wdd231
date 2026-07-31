const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});


const selectCity = document.querySelector('select[name=city]')
const selectDifficulty = document.querySelector('select[name=difficulty]')
const selectSeason = document.querySelector('select[name=season]')

let datas = '';

async function getData() {
    const response = await fetch('./data/places.json');
    const data = await response.json();
    datas = data;
    let lookup = {};
    let cities = [];
    let difficulties = [];
    let seasons = [];
    data.forEach((d) => {
        let city = d.city;
        let difficulty = d.difficulty;
        let season = d.season;

        if (!(city in lookup)) {
            lookup[city] = 1;
            cities.push(city)
            const opt = document.createElement('option')
            opt.value = city;
            opt.innerHTML = city;
            selectCity.appendChild(opt)
        }
        if (!(difficulty in lookup)) {
            lookup[difficulty] = 1;
            difficulties.push(difficulty)
            const opt = document.createElement('option')
            opt.value = difficulty;
            opt.innerHTML = difficulty;
            selectDifficulty.appendChild(opt)
        }
        if (!(season in lookup)) {
            lookup[season] = 1;
            seasons.push(season)
            const opt = document.createElement('option')
            opt.value = season;
            opt.innerHTML = season;
            selectSeason.appendChild(opt)
        }
    })

    const getString = window.location.search;
    const myInfo = new URLSearchParams(getString)
    if (myInfo.get('difficulty') == '') {
        displayPlaces(data)
    } else if (window.location.search != '') {
        const filteredData = data.filter(p => p.difficulty === myInfo.get('difficulty'))
        document.querySelector(`option[value=${myInfo.get('difficulty')}]`).selected = true;  
        displayPlaces(filteredData)
    } else {
        displayPlaces(data)
    }
    
}
getData()

const cards = document.querySelector('.cards')
function displayPlaces(places) {
    cards.innerHTML = '';
    places.forEach(place => {
        const div = document.createElement('div')
        const title = document.createElement('h3')
        const city = document.createElement('p')
        const rating = document.createElement('p')
        const season = document.createElement('p')
        const button = document.createElement('button');
        title.textContent = place.name;
        city.innerHTML = `City: <strong>${place.city}</strong>`;
        rating.innerHTML = `Rating <strong>${place.rating}/5</strong>`;
        season.innerHTML = `Season: <strong>${place.season}</strong>`;
        button.textContent = 'Learn More'
        button.addEventListener('click', () => displayPlaceDetails(place))
        div.appendChild(title)
        div.appendChild(city)
        div.appendChild(rating)
        div.appendChild(season)
        div.appendChild(button)
        cards.appendChild(div)
    });
}


const placeDetails = document.querySelector('#placeDetails')

function displayPlaceDetails(place) {
    placeDetails.innerHTML = '';
    placeDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${place.name}</h2>
    <p>City: <strong>${place.city}</strong></p>
    <p>Difficulty: <strong>${place.difficulty}</strong></p>
    <p>Distance: <strong>${place.distance} km</strong></p>
    <p>Elevation: <strong>${place.elevation} m</strong></p>
    <p>Estimated time: <strong>${place.estimated}</strong></p>
    <p>Type of trail: <strong>${place.trailType}</strong></p>
    <p>Rating <strong>${place.rating}/5</strong></p>
    <p>Season: <strong>${place.season}</strong></p>
  `;
    placeDetails.showModal();

    const closeModal = document.querySelector('#closeModal');

    closeModal.addEventListener("click", () => {
        placeDetails.close();
    });
}


const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.elements['city'].value === '' && form.elements['difficulty'].value === '' && form.elements['season'].value === '') {
        displayPlaces(datas)
    } else {
        let res = '';
        if (form.elements['city'].value !== '') {
            res = datas.filter(p => p.city  === form.elements['city'].value)
        } else if (form.elements['difficulty'].value !== '') {
            res = datas.filter(p => p.difficulty  === form.elements['difficulty'].value)
        } else if (form.elements['season'] !== '') {
            res = datas.filter(p => p.season  === form.elements['season'].value)
        }
        displayPlaces(res)
    }
})