const searchBtn = document.querySelector('.search button');
const content = document.querySelector('.content');
const weatherContent = document.querySelector('.weather-content');
const weatherDetails = document.querySelector('.weather-details');
const temperature = document.querySelector(".weather-content__temperature");
const description = document.querySelector(".weather-content__description");
const humidity = document.querySelector(".humidity-details");
const windSpeed = document.querySelector(".wind-speed");
const weatherIcon = document.querySelector(".weather-content__img");


searchBtn.addEventListener('click', () => {
    showWeather();
})

content.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        showWeather();
    }
})



function showWeather() {
    const apiKey = '36f94bdcb71033aaed41fb7da380e54b';
    const city = document.querySelector('.search__input').value;
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    fetch(queryURL)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.cod === '404') {
                content.style.height = '40%';
                return
            }

            content.style.height = '50%';
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.textContent =  `${json.weather[0].main}`;
            humidity.innerHTML = `${parseInt(json.main.humidity)}<span>%</span>`;
            windSpeed.innerHTML = `${parseInt(json.wind.speed)}<span>Km/h</span>`;
            weatherContent.style.height = '60%';

            switch (json.weather[0].main) {
                case 'Rain':
                    weatherIcon.src = 'images/rain.png';
                    break;
                case 'Snow':
                    weatherIcon.src = 'images/snow.png';
                    break; 
                case 'Clouds':
                    weatherIcon.src = 'images/cloud.png';
                    break;
                case 'Thunderstorm':
                    weatherIcon.src = 'images/thunder.png';
                    break; 
                case 'Clear':
                    weatherIcon.src = 'images/clear.png';
                    break;     
                
            }

            weatherContent.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
        })
}

