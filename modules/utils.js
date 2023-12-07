import { month, year, monthArr } from "../index.js";
import { renderMonth } from "./render.js";

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function changeMonth(value) {
    let i = monthArr.indexOf(month.innerHTML);
    i = i + value;
    if (i < 0) {
        i = 11;
        year.innerHTML = +year.innerHTML - 1;
    } else if (i > 11) {
        i = 0;
        year.innerHTML = +year.innerHTML + 1;
    }
    month.innerHTML = monthArr[i];
    const daysInNewMonth = daysInMonth(+year.innerHTML, i);
    renderMonth(daysInNewMonth);
}

function openWindow(window, eventDate) {
    window.style.display = 'block';
    if (window.classList.contains('add-event')) {
        const p = document.getElementById('event-date');
        p.innerHTML = `${eventDate.toDateString()}`;
    }
}

function clearEvents(eventsDiv) {
    eventsDiv.innerHTML = '';
}

function closeBtnEventListener(btn, window, overlay) {
    btn.addEventListener('click', function () {
        window.style.display = 'none';
        if (overlay) {
            overlay.style.display = 'none';
        }
        const existingEvents = document.getElementById('view-event');
        if (window.contains(existingEvents)) {
            clearEvents(existingEvents)
        }
    })
}

export { changeMonth, openWindow, closeBtnEventListener, daysInMonth }