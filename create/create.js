import { checkAuth, logout, createParticipant, getWorkshops } from '../fetch-utils.js';

checkAuth();

const form = document.querySelector('form');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const name = data.get('name');
    const workshop_id = data.get('workshop_id');

    // let's make an object to pass as an argument to the createParticipant function
    await createParticipant({
        name: name,
        workshop_id: workshop_id
    });

    window.location.href = '../workshops';
});

window.addEventListener('load', async () => {
    const dropdown = document.querySelector('select');

    const workshops = await getWorkshops();

    for (let workshop of workshops) {
        const optionEl = document.createElement('option');

        // what the computer sees
        optionEl.value = workshop.id;
        // what the user sees
        optionEl.textContent = workshop.wname;

        dropdown.append(optionEl);
    }
});