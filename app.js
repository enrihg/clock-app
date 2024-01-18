const btnLessMore = document.querySelector('.btn-lessMore');
const quote = document.querySelector('.quote');
const modal = document.querySelector('.modal');

btnLessMore.addEventListener('click', () => {
    quote.classList.toggle('display-none');
    modal.classList.toggle('display-none');
    modal.classList.contains('display-none') ? btnLessMore.firstElementChild.innerText ='MORE' : btnLessMore.firstElementChild.innerText ='LESS';
})

