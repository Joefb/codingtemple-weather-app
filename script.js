const weatherForm = document.getElementById('weather-form-id')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();
  const apiKey = '575b701d163d220deb63ce465bdd7399';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // handle your weather data here
      updateWeatherDisplay(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
})

function updateWeatherDisplay(weatherData) {
  document.getElementById('city').textContent = weatherData.name;

  // Update high and low temps
  document.getElementById('high-temp').textContent = Math.round(weatherData.main.temp_max) + '°C';
  document.getElementById('low-temp').textContent = Math.round(weatherData.main.temp_min) + '°C';

  // Update forecast (weather description)
  document.getElementById('forecast').textContent = weatherData.weather[0].description;

  // Update humidity
  document.getElementById('humidity').textContent = weatherData.main.humidity + '%';
}


