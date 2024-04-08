//2:25
const apiKey = 'ecdeeafae97247d8ac6145628240704';

// //http://api.weatherapi.com/v1/current.json?key=ecdeeafae97247d8ac6145628240704&q=London




//получаем элементы
const header = document.querySelector('.header')
const form = document.querySelector('.form');
const input = document.querySelector('.input');

function removeCard(){
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}
function showCard({name, country, temp, condition}){
    const html = `<div class="card">
    <h2 class="card-city">${name}<span>${country}</span></h2>

    <div class="card-weather">
        <div class="card-value">${temp}<sup>°c</sup></div>
        <img class="card-img" src="./img/weather/drizzle.png" alt="">
    </div>

    <div class="card-description">${condition}</div>
</div>`;

header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city){
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    const response = await fetch(url);
    const data = await response.json()
    return data;
    
}
// слушаем отправку формы

form.onsubmit = async function (e) {
    //отменяем отправку формы
    e.preventDefault();

    //берем значение из инпута
    let city = input.value.trim();

    //делаем запрос на серв

    const data = await getWeather(city);

    if (data.error) {
        input.value = '';
        removeCard()
        const html = `<div class="card">Мы не нашли такой город.</div>`;
        header.insertAdjacentHTML('afterend', html);
    }else{
        input.value = '';
        if(data.location.country === 'Соединенные Штаты Америки') data.location.country = 'США';
        if(data.location.country === 'United States of America') data.location.country = 'USA'; 
        fetch('./dic.js')
        removeCard();
        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text
        }
        showCard(weatherData);
    }

    
}