const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.getElementById("lastModified").innerHTML = document.lastModified;


const temp = document.querySelector('#current-temp')
const image = document.querySelector('#weather-icon')
const fig = document.querySelector('figcaption')
const forecast = document.querySelector('#forecast')

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-28.05&lon=-56.01&appid=71af0db7deda29b809c083c77221039b'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-28.05&lon=-56.01&cnt=3&appid=71af0db7deda29b809c083c77221039b';
async function apiFetch() {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log(response.text())
        } else {
            const data = await response.json()
            temp.innerHTML = `${data.main.temp} F°`;
            image.setAttribute('alt', data.weather[0].main)
            image.setAttribute('src', `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`)
            fig.innerHTML = data.weather[0].description;
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
            console.log(data)
            data.list.forEach((day) => {
                const title = document.createElement('p')
                title.textContent = new Date(day.dt_txt).toLocaleDateString("en-US", options);
                const p = document.createElement('p')
                p.textContent = `${day.main.temp} F°`
                forecast.append(title)
                forecast.appendChild(p)
            })
        }
    } catch (e) {
        console.log(e)
    }
}
forecastFetch()
apiFetch()