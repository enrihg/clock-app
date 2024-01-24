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

let ip= 0;
let hour= 0;
let hours= 0;
let minutes= 0;
let weekNumber= 0;
let weekDay= 0;
let yearDay= 0;
let unixtime=0 ;
let timezone= 0;
let utcOffset='';
let city='';
let country='';

getGeolocalizationData();
updateHour();
randomQuote();


//Shows/hide the modal and quote section when clicking the less/more button
btnLessMore.addEventListener('click', () => {
    quote.classList.toggle('display-none');
    modal.classList.toggle('display-none');
    modal.classList.contains('display-none') ? btnLessMore.firstElementChild.innerText = 'MORE' : btnLessMore.firstElementChild.innerText = 'LESS';
})


//Gives a random quote when clicking the refresh button
btnRefresh.addEventListener('click', randomQuote);

function randomQuote() {
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


//updates the geolocalization object properties values
function getGeolocalizationData() {
    fetch('http://worldtimeapi.org/api/ip')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            weekNumber = data.week_number; //ver si cambiarlo
            weekDay = data.day_of_week; //ver si cambiarlo
            yearDay = data.day_of_year; //ver si cambiarlo
            timezone = data.timezone;
            ip = (data.client_ip);
            utcOffset = data.utc_offset; //ver si cambiarlo
            unixtime = data.unixtime;
        })
        .then(() => {
            fetch(`https://ipapi.co/${ip}/json`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    city = data.city;
                    country = data.country_name;
                })
                .catch((e) => {
                    console.log('IP ERROR!!', e);
                })
        })
        .catch((e) => {
            console.log('GEOLOCALIZATION ERROR', e);
        })
}

//updates the hour every 1 second ???
function updateHour() {
    setInterval(() => {
        console.log(unixtime += 1);;
        let date = new Date(unixtime * 1000); //ver cada cuanto conviene actualizar los datos
        hours = date.getHours();
        minutes = date.getMinutes();
        hour = Number(`${hours}.${minutes}`);
        setGeolocalizationData();
    }, 1000)
}


//Updates the UI with geolocalization data;
function setGeolocalizationData() {
    showWeekNumber.innerText = weekNumber;
    showWeekDay.innerText = weekDay;
    showYearDay.innerText = yearDay;
    showTimezone.innerText = timezone;
    showCityAndCountry.innerText = `IN ${city}, ${country}`.toUpperCase();
    showUtc.innerText = `UTC: ${utcOffset}`;
    showTime.innerText = `${hours}:${minutes}`;
    greeter()
    isDayOrNight();
}


//Sets the greeting acording to the hour
function greeter() {
    if (5 <= hour && hour < 12) showGreeting.innerText = 'GOOD MORNING';
    else if (12 <= hour && hour < 18) showGreeting.innerText = 'GOOD AFTERNOON';
    else showGreeting.innerText = 'GOOD EVENING';
}

//Sets day or night CSS class
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


