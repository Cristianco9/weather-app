const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

  const APIKey = 'your-api-key';
  const city = document.querySelector('.search-box input').value;

  if (city === '') {
    return;
  };

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
  .then( response =>  response.json() )
  .then( dataJSON => {

    if (dataJSON.cod === '404') {
      container.style.height = '40rem';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    } else {
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');
    }

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    const currentTime = dataJSON.dt;
    const sunrise = dataJSON.sys.sunrise;
    const sunset = dataJSON.sys.sunset;
    const isDaytime = currentTime >= sunrise && currentTime <= sunset;

    switch (dataJSON.weather[0].main) {

      case 'Clear':
        image.src = isDaytime ? '../images/day-clear.png' : '../images/night-clear.png';
        break;

      case 'Rain':
        image.src = '../images/rain.png';
        break;

      case 'Snow':
        image.src = '../images/snow.png';
        break;

      case 'Clouds':
        image.src = isDaytime ? '../images/day-cloud.png' : '../images/night-cloud.png';
        break;

      case 'Haze':
        image.src = '../images/mist.png';
        break;

      default:
        image.src = '';

    }

    temperature.innerHTML = `${parseInt(dataJSON.main.temp)}<span>°C</span>`;
    description.innerHTML = `${dataJSON.weather[0].description}`;
    humidity.innerHTML = `${dataJSON.main.humidity}%`
    wind.innerHTML = `${parseInt(dataJSON.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '59rem';

  })

});
