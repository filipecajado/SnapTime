// https://openweathermap.org/ Local da API


// Interação
const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');

// Exibição 
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icons');
const weatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = '13eb038e5db4c309e53a9e73d6a19b48'

citySearchButton.addEventListener('click', () => {

  let cityName = citySearchInput.value
  getCityWeather(cityName)
})

// https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&lang=pt_BR&appid={api_key}

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  getCurrentLocationWeather(lat, lon)

},
  (err) => {
    if (err.code === 1) {
      alert('Geolocalizao negada pelo usuário, busque manualmentte pela sua cidade através da barra de pesquisa')
    } else {
      console.log(err)
    }
  }
)

function getCurrentLocationWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_BR&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {

  weatherIcon.src = `./assets/imagem/loading-icon.svg`

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function displayWeather(data) {
  let {
    dt,
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { sunrise, sunset }
  } = data

  currentDate.textContent = formatDate(dt);
  cityName.textContent = name;
  weatherIcon.src = `./assets/imagem/${icon}.svg`
  weatherDescription.textContent = description;
  currentTemperature.textContent = `${Math.round(temp)}°C`;
  windSpeed.textContent = `${Math.round(speed * 3.6)}km`;
  feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
  currentHumidity.textContent = `${humidity}%`;
  sunriseTime.textContent = formatTime(sunrise);
  sunsetTime.textContent = formatTime(sunset);

}

// Formatacao da data
function formatDate(epocTime) {
  let date = new Date(epocTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR', { month: 'long', day: 'numeric' })
  return `Hoje, ${formattedDate}`
}

// Formatacao de hora e minuto
function formatTime(epocTime) {
  let date = new Date(epocTime * 1000)
  let hours = date.getHours()
  let minutos = date.getMinutes()
  return `${hours}:${minutos}`
}
