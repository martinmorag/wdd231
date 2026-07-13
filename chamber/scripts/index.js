const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.getElementById("lastModified").innerHTML = document.lastModified;


const temp = document.querySelector('#current-temp')
const figure = document.querySelector('figure')
const fig = document.querySelector('figcaption')
const forecast = document.querySelector('#forecast')

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-28.05&lon=-56.01&units=metric&appid=71af0db7deda29b809c083c77221039b'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-28.05&lon=-56.01&units=metric&appid=4fdbbe73f2dc231f1089a5a45b6f62b9';
async function apiFetch() {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log(response.text())
        } else {
            const data = await response.json()

            const img = document.createElement('img')
            img.id = 'weather-icon'
            temp.innerHTML = `${data.main.temp} C°`;
            img.setAttribute('alt', data.weather[0].main)
            img.setAttribute('src', `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`)
            fig.innerHTML = data.weather[0].description;
            figure.appendChild(img)
        }
    } catch (e) {
        console.log(e)
    }
}
async function forecastFetch() {
    const options = {
        month: "short",
        day: "numeric",
        year: "numeric"
    };

    try {
        const response = await fetch(forecastUrl)
        if (!response.ok) {
            console.log(response.text())
        } else {
            const data = await response.json()
            const indexes = [1, 9, 18]
            const filtered = []
            indexes.forEach(x => filtered.push(data.list[x]))
            filtered.forEach((day) => {
                const forecastDiv = document.createElement('div')
                forecastDiv.classList.add('forecast-div')
                const title = document.createElement('p')
                title.textContent = new Date(day.dt_txt).toLocaleDateString("en-US", options);
                const p = document.createElement('p')
                p.textContent = `${day.main.temp} C°`;
                forecastDiv.append(title)
                forecastDiv.appendChild(p)
                forecast.appendChild(forecastDiv)
            })
        }
    } catch (e) {
        console.log(e)
    }
}

async function fetchJSON() {
    const spotlights = document.querySelector('.container');
    try {
        const response = await fetch('./data/members.json')
        if (response.ok) {
            const data = await response.json()
            const filtered = data.filter(d => d.level === 2 || d.level === 3)
            const shuffle = filtered.sort(() => 0.5 - Math.random())
            const selected = shuffle.slice(0, 3)
            
            selected.forEach((sel) => {
                const div = document.createElement('div')
                const inner = document.createElement('div')
                const title = document.createElement('h3')
                const other = document.createElement('p')
                const img = document.createElement('img')
                div.classList.add('spotlight')
                title.textContent = sel.companyName;
                img.setAttribute('src', `./images/${sel.imageFile}`)
                img.setAttribute('alt', sel.companyName)
                other.textContent = sel.other;
                div.appendChild(title)
                inner.appendChild(img)
                inner.appendChild(other)
                div.appendChild(inner)
                spotlights.appendChild(div)
            })
        }
    } catch (e) {
        console.log(error)
    }
}
fetchJSON()
forecastFetch()
apiFetch()