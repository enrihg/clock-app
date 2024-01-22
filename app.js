const btnLessMore = document.querySelector('.btn-lessMore');
const btnRefresh = document.querySelector('.btn-refresh');
const quote = document.querySelector('.quote');
const quoteParagraph = document.querySelector('.quote-paragraph');
const quoteAuthor = document.querySelector('.quote-author');
const modal = document.querySelector('.modal');


//Shows/hide modal and quote section when clicking the less/more button
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
            console.log('RESOLVED', res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            quoteParagraph.innerText = `"${data[0].content}"`;
            quoteAuthor.innerText = data[0].author;
        })
        .catch((e) => {
            console.log('ERROR!!', e);
        });

}

randomQuote();

const weekNumber = document.querySelector('.week-number');
const weekDay = document.querySelector('.week-day');
const yearDay = document.querySelector('.year-day');
const timezone = document.querySelector('.timezone');

//Geolocalization data
function geolocalization() {
    fetch('http://worldtimeapi.org/api/ip')
        .then((res) => {
            console.log('GEOLOCALIZATION RESOLVED', res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            weekNumber.innerText = data.week_number;
            weekDay.innerText = data.day_of_week;
            yearDay.innerText = data.day_of_year;
            timezone.innerText = data.timezone;
        })
        .catch((e) => {
            console.log('GEOLOCALIZATION ERROR', e);
        })

}

geolocalization();


//Sets the greeting acording to the hour
let hour = 19;
const greeting = document.querySelector('.greeting');

function greeter(hour) {
    console.log(hour);
    if (5 <= hour && hour < 12) greeting.innerText = 'GOOD MORNING';
    else if (12 <= hour && hour < 18) greeting.innerText = 'GOOD AFTERNOON';
    else greeting.innerText = 'GOOD EVENING';
    console.log(greeting);
}

greeter(hour);

//Sets day or night variable
const main = document.querySelector('main');
const daytimeIcon = document.querySelector('.daytime-icon');

function isDayOrNight(hour) {
    if (5 <= hour && hour < 18) {
        daytimeIcon.classList.add('is-day');
        daytimeIcon.classList.remove('is-night');
        main.classList.add('is-day');
        main.classList.remove('is-night');
    } else {
        daytimeIcon.classList.add('is-night');
        daytimeIcon.classList.remove('is-day');
        main.classList.add('is-night');
        main.classList.remove('is-day');
    }
}

isDayOrNight(hour);
