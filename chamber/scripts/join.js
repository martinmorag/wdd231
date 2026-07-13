const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.getElementById("lastModified").innerHTML = document.lastModified;

const cards = document.querySelector('#cards')

async function getData() {
    const response = await fetch('./data/memberships.json');
    const data = await response.json();
    displayCards(data)
}
getData()

function displayCards(memberships) {
    memberships.forEach(membership => {
        const div = document.createElement('div')
        const button = document.createElement('button')
        const p = document.createElement('p') 
        div.classList.add(membership.id)
        p.textContent = membership.name;
        button.textContent = "Learn More"
        button.addEventListener('click', () => displayMembershipDetails(membership))
        div.appendChild(p)
        div.appendChild(button)
        cards.appendChild(div)
    });
}


const membershipDetails = document.querySelector('#membershipDetails')

function displayMembershipDetails(membership) {
    membershipDetails.innerHTML = '';
    membershipDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${membership.name}</h2>
    <p>${membership.description}</p>
  `;
    membershipDetails.showModal();

    const closeModal = document.querySelector('#closeModal');

    closeModal.addEventListener("click", () => {
        membershipDetails.close();
    });
}



const getString = window.location.search;

const myInfo = new URLSearchParams(getString)