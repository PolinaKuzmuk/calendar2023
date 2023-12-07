import { month, year, currentDate, monthArr, eventsList } from "../index.js";

let daysList = document.getElementsByClassName('days')[0];

function renderMonth(daysInMonth) {
    daysList.innerHTML = '';
    for (let index = 1; index <= daysInMonth; index++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.id = index;
        day.innerHTML = index;
        day.style.cursor = 'pointer';
        daysList.appendChild(day);
        highlightToday(index, day, month, year);
        highlightEventDay(day);
    }
    setStartDay();
}

function setStartDay() {
    const getStartDay = new Date(year.innerHTML, monthArr.indexOf(month.innerHTML), 1).getDay();
    const firstDayInMonth = document.getElementById('1');
    if (getStartDay === 0) {
        firstDayInMonth.style.gridColumnStart = 7;
    } else {
        firstDayInMonth.style.gridColumnStart = getStartDay;
    }
}

function highlightToday(i, day, month, year) {
    if (i === currentDate.getDate() &&
        month.innerHTML === monthArr[currentDate.getMonth()] &&
        +year.innerHTML === currentDate.getFullYear()) {
        day.classList.add('today');
    }
}

function highlightEventDay(day) {
    eventsList.filter(item => {
        const dateOfEvent = item.dateVenue.split('-');
        if (+dateOfEvent[0] === +year.innerHTML && +dateOfEvent[1] - 1 === +monthArr.indexOf(month.innerHTML) && +dateOfEvent[2] === +day.innerHTML) {
            day.classList.add('is-event');
        }
    })
}

function renderEvent(parent, event) {
    const ul = document.createElement('ul');
    parent.appendChild(ul);
    for (const key in event) {
        const li = document.createElement('li');
        ul.appendChild(li);
        if (typeof event[key] === 'object') {
            li.innerHTML = `${key}:`;
            renderEvent(li, event[key]);
        } else {
            li.innerHTML = `${key}: ${event[key]}`;
        }
    }
}

export { daysList, renderMonth, renderEvent }