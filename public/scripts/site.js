document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});

async function fetchEvents() {
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}


function displayEvents(events) {
    const eventsContainer = document.querySelector('.events-list');
    eventsContainer.innerHTML = ''; 

    events.forEach(event => {
        const eventHTML = `
            <div class="event">
                <h5>${event.name}</h5>
                <p class="location">Location: ${event.location}</p>
                <p class="dates">Dates: ${event.dates}</p>
                <p class="hours">Hours: ${event.hours}</p>
            </div>
        `;
        eventsContainer.innerHTML += eventHTML;
    });
}
