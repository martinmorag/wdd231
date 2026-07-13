const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar')

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.getElementById("lastModified").innerHTML = document.lastModified;

async function getData(id) {
    const response = await fetch('./data/memberships.json');
    const data = await response.json();
    const membership = data.filter(d => d.id === id).map(d => d.name)
    document.querySelector('.m').textContent = membership[0]
}


const getString = window.location.search;

const myInfo = new URLSearchParams(getString)

getData(myInfo.get('membership'))

let orgTitle = false;
if (myInfo.get('org-title') != '') orgTitle = true;

let orgDescription = false;
if (myInfo.get('org-description') != '') orgDescription = true;

document.querySelector('#results').innerHTML = `
<p>Thank you for joining ${myInfo.get('first')} ${myInfo.get('last')}!</p>
${orgTitle ? `<p>Your organizational title: ${myInfo.get('org-title')}</p>` : ''}
<p>Your email is: ${myInfo.get('email')}</p>
<p>Your phone number is: ${myInfo.get('phone')}</p>
<p>Your organization's name is: ${myInfo.get('org-name')}
<p>Your membership is: <span class="m"></span></p>
${orgDescription ? `<p>Your organization description: ${myInfo.get('org-description')}</p>` : ''}
`