let temp = document.querySelector('#current-temp')
let image = document.querySelector('#weather-icon')
let fig = document.querySelector('figcaption')

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=d82e57af34aff4b7fb1c495d1b817b1e'

async function apiFetch() {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log(response.text())
        } else {
            const data = await response.json()
            console.log(data)
            temp.innerHTML = data.main.temp;
            image.setAttribute('alt', data.weather[0].main)
            image.setAttribute('src', `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`)
            fig.innerHTML = data.weather[0].description;
        }
    } catch (e) {
        console.log(e)
    }
}
apiFetch()