import {
    checkAuth,
    logout,
    getWorkshops,
} from '../fetch-utils.js';

checkAuth();

const workshopList = document.getElementById('workshops-container');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    fetchAndDisplayWorkshops();
});

async function fetchAndDisplayWorkshops() {
    const workshops = await getWorkshops();
    console.log(workshopList);
    workshopList.textContent = '';

    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const participantsEl = document.createElement('div');

        workshopEl.classList.add('workshop');

        nameEl.textContent = workshop.wname;

        workshopEl.append(nameEl, participantsEl);

        for (let participant of workshops.participants) {
            const participantEl = document.createElement('p');

            participantEl.classList.add('participant');
            // participantEl.addEventListener('click', async () => {
            //     await deleteParticipant(participant.id);

            //     fetchAndDisplayWorkshops();
            // });
            participantEl.textContent = `${participant.name} : ${participant.workshop_id}`;

            participantsEl.append(participantEl);
        }

        workshopList.append(workshopEl);
    }
}