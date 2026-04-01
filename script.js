const form = document.getElementById('searchForm');
const input = document.getElementById('cityInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weather = document.getElementById('weather');

const API_KEY = '2e1c702e69d2cd1f7f5ee75c07081b63'
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    
    if(!city) return;
    
    await fetchWeather(city);
    input.value = '';
});

async function fetchWeather(city) {
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    weather.classList.add('hidden');
try {
    const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            response.status === 404
            ? 'City not found'
            : `Error: ${response.status}`
        );                   
    }

    const data = await response.json();

    displayWeather(data);

}catch (err) {
    error.textContent = err.message;
    error.classList.remove('hidden');

} finally {
    loadfing.classList.add('hidden');
}
}

function displayWeather(data) {
    document.getElementById('cityName').textContent =
    `${data.name}, ${data.sys.country}`;

    document.getElementById('temp').textContent =
    `${Math.round(data.main.temp)}°C`;

    document.getElementById('description').textContent =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);

    document.getElementById('details').textContent =
    `Feels like ${Math.round(data.main.feels_like)}°C .` +
    `Humidity ${data.main.humidity}% .` +
    `Wind ${Math.round(data.wind.speed)} m/s`;

    weather.classList.remove('hidden')
}