const btnLessMore = document.querySelector('.btn-lessMore');
const btnRefresh = document.querySelector('.btn-refresh');
const quote = document.querySelector('.quote');
const quoteParagraph = document.querySelector('.quote-paragraph');
const quoteAuthor = document.querySelector('.quote-author');
const modal = document.querySelector('.modal');
const main = document.querySelector('main');
const showWeekNumber = document.querySelector('.week-number');
const showWeekDay = document.querySelector('.week-day');
const showYearDay = document.querySelector('.year-day');
const showTimezone = document.querySelector('.timezone');
const showCityAndCountry = document.querySelector('.city-country');
const showTime = document.querySelector('.hour');
const showGreeting = document.querySelector('.greeting');
const showDaytimeIcon = document.querySelector('.daytime-icon');
const showUtc = document.querySelector('.utc');

let ip;
let hour;
let hours;
let minutes;
let weekNumber;
let weekDay;
let yearDay;
let unixtime;
let timezone;
let utcOffset;
let city;
let country;
let date;

initialLoad();
updateHour();

async function initialLoad() {
    getRandomQuote();
    await fetchGeolocalizationData();
    setInitialHour();
    updateUi();
}

//fetches the geolocalization data
async function fetchGeolocalizationData() {
    await fetch('http://worldtimeapi.org/api/ip')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            weekNumber = data.week_number; 
            //the API by default shows Sunday as 0, i changed it to be 7 instead
            weekDay = (data.day_of_week == 0) ? 7 : data.day_of_week; 
            console.log(weekDay);
            yearDay = data.day_of_year; 
            timezone = data.timezone;
            ip = (data.client_ip);
            utcOffset = data.utc_offset; 
            unixtime = data.unixtime * 1000;
        })
        .catch((e) => {
            console.log('GEOLOCALIZATION ERROR', e);
        })
       
    await fetch(`https://ipapi.co/${ip}/json`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            city = data.city;
            country = data.country_name;
        })
        .catch((e) => {
            console.log('IP ERROR!!', e);
        })
}

function setInitialHour() {
    date = new Date(unixtime);
    console.log(date);
    hours = date.getHours();
    minutes = date.getMinutes();
    hour = Number(`${hours}.${minutes}`);
    console.log(hour);
}

//updates the hour every 1 minute
function updateHour() {
    setInterval(() => {
        unixtime = unixtime + 60000;
        date = new Date(unixtime);
        console.log(date);
        hours = date.getHours();
        minutes = date.getMinutes();
        hour = Number(`${hours}.${minutes}`);
        //checks if a new day has begun, in order to fetch new data from APIs to update the day, week day and week number
        let isMidnight = hour == 0.0;
        isMidnight ? initialLoad() : '' ;
        console.log(isMidnight);

        updateUi();
    }, 60000);
}

//updates the UI with geolocalization data from the APIs;
function updateUi() {
    showWeekNumber.innerText = weekNumber;
    showWeekDay.innerText = weekDay;
    showYearDay.innerText = yearDay;
    showTimezone.innerText = timezone;
    showCityAndCountry.innerText = `IN ${city}, ${country}`.toUpperCase();
    showUtc.innerText = `UTC: ${utcOffset}`;
    showTime.innerText = twoDigitsHour();
    showGreeting.innerText = greeter();
    isDayOrNight();
}

//displays the hour in a 2 digits format, e.g: 03:05, not: 3.5
function twoDigitsHour () {
    let twoDigitsHour = hours < 10 ? '0'.concat(hours) : hours;
    let twoDigitsMinutes = minutes < 10 ? '0'.concat(minutes) : minutes;
    twoDigits = `${twoDigitsHour}:${twoDigitsMinutes}`;
    return twoDigits;
}

//sets the greeting acording to the hour
function greeter() {
    let greeting
    if (5 <= hour && hour < 12) greeting = 'GOOD MORNING';
    else if (12 <= hour && hour < 18) greeting = 'GOOD AFTERNOON';
    else greeting = 'GOOD EVENING';
    return greeting;
}

//sets day or night CSS class
function isDayOrNight() {
    if (5 <= hour && hour < 18) {
        showDaytimeIcon.classList.add('is-day');
        showDaytimeIcon.classList.remove('is-night');
        main.classList.add('is-day');
        main.classList.remove('is-night');
    } else {
        showDaytimeIcon.classList.add('is-night');
        showDaytimeIcon.classList.remove('is-day');
        main.classList.add('is-night');
        main.classList.remove('is-day');
    }
}

//shows/hide the modal and quote section when clicking the less/more button
btnLessMore.addEventListener('click', () => {
    quote.classList.toggle('display-none');
    modal.classList.toggle('display-none');
    modal.classList.contains('display-none') ? btnLessMore.firstElementChild.innerText = 'MORE' : btnLessMore.firstElementChild.innerText = 'LESS';
})

//gives a random quote when clicking the refresh button
btnRefresh.addEventListener('click', getRandomQuote);

function getRandomQuote() {
    fetch('https://api.quotable.io/quotes/random')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            quoteParagraph.innerText = `"${data[0].content}"`;
            quoteAuthor.innerText = data[0].author;
        })
        .catch((e) => {
            console.log('ERROR!!', e);
        });
}
