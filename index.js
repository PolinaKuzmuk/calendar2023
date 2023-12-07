import { getEventsList } from "./modules/API.js";
import { daysList, renderMonth, renderEvent } from "./modules/render.js";
import { changeMonth, openWindow, closeBtnEventListener, daysInMonth } from "./modules/utils.js";

const btnNextMonth = document.getElementsByClassName('btn-next')[0];
const btnPrevMonth = document.getElementsByClassName('btn-prev')[0];
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'];
const currentDate = new Date();
let year = document.getElementsByClassName('year')[0];
let month = document.getElementsByClassName('month')[0];
let eventsList = '';

month.innerHTML = monthArr[currentDate.getMonth()];
year.innerHTML = currentDate.getFullYear();

btnNextMonth.addEventListener('click', function () {
    changeMonth(1);
});

btnPrevMonth.addEventListener('click', function () {
    changeMonth(-1);
});

daysList.addEventListener('click', function (e) {
    const eventPreview = document.getElementsByClassName('event-preview')[0];
    const overlay = document.getElementById('overlay');
    const closeBtn = eventPreview.getElementsByClassName('btn-close')[0];
    const addEventBtn = eventPreview.getElementsByClassName('btn-add-event')[0];
    if (e.target.id) {
        const thisDate = new Date(year.innerHTML, monthArr.indexOf(month.innerHTML), e.target.id);
        openWindow(overlay);
        openWindow(eventPreview);
        closeBtnEventListener(closeBtn, eventPreview, overlay);
        eventsList.filter(event => {
            const eventDate = new Date(`${event.dateVenue}T00:00:00`);
            const eventWindow = document.getElementById('view-event');
            if (eventDate.toDateString() == thisDate.toDateString()) {
                const eventWrap = document.createElement('div');
                eventWrap.classList.add('event-wrap');
                eventWindow.appendChild(eventWrap);
                renderEvent(eventWrap, event);
            }
        })
        addEventBtn.addEventListener('click', function () {
            const eventWindow = document.getElementsByClassName('add-event')[0];
            const closeBtn = eventWindow.getElementsByClassName('btn-close')[0];
            openWindow(eventWindow, thisDate);
            closeBtnEventListener(closeBtn, eventWindow);
        })
    }
});

getEventsList()
    .then(res => {
        eventsList = res.data;
        localStorage.setItem('eventsList', JSON.stringify(res.data));
        const daysInThisMonth = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        renderMonth(daysInThisMonth);
    })

export { month, year, currentDate, monthArr, eventsList }