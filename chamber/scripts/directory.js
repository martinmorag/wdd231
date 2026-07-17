const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.getElementById("lastModified").innerHTML = document.lastModified;

const cards = document.querySelector('#cards')
const gridBtn = document.querySelector('#grid')
const listBtn = document.querySelector('#list')

async function fetchJSON() {
    try {
        const response = await fetch('./data/members.json')
        if (response.ok) {
            const data = await response.json()
            data.forEach(company => {
                const div = document.createElement('div')
                const container = document.createElement('div')
                const info = document.createElement('div')
                const h2 = document.createElement('h2')
                const img = document.createElement('img')
                const address = document.createElement('p')
                const email = document.createElement('p')
                const phone = document.createElement('p')
                const url = document.createElement('p')

                h2.textContent = company.companyName;
                img.setAttribute('src', `images/${company.imageFile}`)
                img.setAttribute('alt', company.companyName)
                img.setAttribute('loading', 'lazy')
                address.textContent = company.address;
                email.innerHTML = `<strong>EMAIL:</strong> ${company.email}`;
                phone.innerHTML = `<strong>PHONE:</strong> ${company.phoneNumber}`;
                url.innerHTML = `<strong>URL:</strong> ${company.websiteUrl}`;

                div.classList.add('big-container')
                container.classList.add('container')
                info.classList.add('info')

                div.appendChild(h2)
                div.appendChild(address)

                info.appendChild(email)
                info.appendChild(phone)
                info.appendChild(url)

                container.appendChild(img)
                container.appendChild(info)
                
                div.appendChild(container)
                cards.appendChild(div)
            });
        }
    } catch (e) {
        console.log(error)
    }
}
fetchJSON()

gridBtn.addEventListener('click', function () {
    if (screen.width > 608) {
        cards.style.gridTemplateColumns = '1fr 1fr 1fr';
        document.querySelectorAll('#cards img').forEach(img => {
            img.style.display = 'block'
        });
    }
})
listBtn.addEventListener('click', function () {
    cards.style.gridTemplateColumns = '1fr';
    document.querySelectorAll('#cards img').forEach(img => {
        img.style.display = 'none'
    });
})