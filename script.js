const weatherForm = document.getElementById('weather-form-id')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  // Im taking the api key out. I dont want it pushed to github.
  // Put your own api key in.
  const apiKey = '';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Do api call for data
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Debug info
      updateWeatherDisplay(data);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('city').textContent = "City state not found!";

    });

  cityInput.value = "";
})

function updateWeatherDisplay(weatherData) {
  // Update city and country
  document.getElementById('city').textContent = weatherData.name + ', ' + weatherData.sys.country;

  // Get the icon and add to element
  const icon = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const cityElem = document.getElementById('city');
  cityElem.innerHTML = `<img src="${iconUrl}" alt="Weather icon" width="45" height="45" style="vertical-align:middle;"> ` + cityElem.textContent;

  // Update high, low temps. Convent to farenhight
  document.getElementById('high-temp').textContent = Math.round(weatherData.main.temp_max * 1.8 + 32) + '°F';
  document.getElementById('low-temp').textContent = Math.round(weatherData.main.temp_min * 1.8 + 32) + '°F';

  // Update forecast
  const description = weatherData.weather[0].description;
  const titled = description.charAt(0).toUpperCase() + description.slice(1);
  document.getElementById('forecast').textContent = titled;

  // Update humidity
  document.getElementById('humidity').textContent = weatherData.main.humidity + '%';
}


