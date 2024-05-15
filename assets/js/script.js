// DOM elements
const searchInputEl = document.getElementById("search-input");
const searchButtonEl = document.getElementById("search-button");
const cityHistoryEl = document.getElementById("city-history");

// API key and URL
const apiKey = "6373a3bec1231c9f6ff6230c3876cca2";
const apiUrl = "https://api.openweathermap.org/data/2.5";

// Event listener for search button
searchButtonEl.addEventListener("click", () => {
  const searchInput = searchInputEl.value.trim();
  if (searchInput) {
    getLocation(searchInput);
  }
});

// Function to get location
async function getLocation(city) {
  try {
    const locationUrl = `${apiUrl}/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(locationUrl);
    const data = await response.json();
    const { coord } = data;
    if (coord) {
      getWeather(coord.lat, coord.lon);
      updateCityHistory(city);
    } else {
      console.error("City not found");
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

// Function to get weather data
async function getWeather(lat, lon) {
  try {
    const weatherUrl = `${apiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=english&appid=${apiKey}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

function displayWeather(data) {
    const city = data.city.name;
    const weatherList = data.list.slice(0, 6);
    for (let i = 0; i < weatherList.length; i++) {
      const { main, wind, dt, weather } = weatherList[i];
      const date = new Date(dt * 1000);
      document.getElementById(`cityday${i}`).textContent = `City Day: ${city} ${date.toLocaleDateString()}`;
      document.getElementById(`temp${i}`).textContent = `Temperature: ${main.temp}°C`;
      document.getElementById(`humid${i}`).textContent = `Humidity: ${main.humidity}%`;
      document.getElementById(`wind${i}`).textContent = `Wind Speed: ${wind.speed}KM/H`;
      const weatherIcon = document.getElementById(`weather-icon${i}`);
      if (weatherIcon && weather && weather.length > 0 && weather[0].icon) {
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${weather[0].icon}.png`);
      }
    }
  }
  

// Function to print city history
function printCityHistory() {
  cityHistoryEl.innerHTML = "";
  const cityHistory = JSON.parse(localStorage.getItem("city_history")) || [];
  cityHistory.slice(0, 3).forEach(city => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = city;
    button.value = city;
    button.addEventListener("click", () => getLocation(city));
    li.appendChild(button);
    cityHistoryEl.appendChild(li);
  });
}

// Function to update city history
function updateCityHistory(city) {
  const cityHistory = JSON.parse(localStorage.getItem("city_history")) || [];
  const index = cityHistory.indexOf(city);
  if (index !== -1) {
    cityHistory.splice(index, 1);
  }
  cityHistory.unshift(city);
  localStorage.setItem("city_history", JSON.stringify(cityHistory.slice(0, 3)));
  printCityHistory();
}

// Load city history on page load
printCityHistory();
