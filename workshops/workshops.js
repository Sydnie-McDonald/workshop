import {
    checkAuth,
    logout,
    getWorkshops,
} from '../fetch-utils.js';

checkAuth();

const workshopListEl = document.querySelector('.workshops-list');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    fetchAndDisplayWorkshops();
});

async function fetchAndDisplayWorkshops() {
    const workshops = await getWorkshops();

    workshopListEl.textContent = '';

    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const participantsEl = document.createElement('div');

        workshopEl.classList.add('workshop');

        nameEl.textContent = workshop.name;

        workshopEl.append(nameEl, participantsEl);

        for (let participant of workshop.workshop_participants) {
            const participantEl = document.createElement('p');

            participantEl.classList.add('participant');
            // participantEl.addEventListener('click', async () => {
            //     await deleteParticipant(participant.id);

            //     fetchAndDisplayWorkshops();
            // });
            participantEl.textContent = `${participant.name} : ${participant.contact}`;

            participantsEl.append(participantEl);
        }

        workshopListEl.append(workshopEl);
    }
}