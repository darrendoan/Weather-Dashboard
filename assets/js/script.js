 var cityInput = document.querySelector(".city-input");
 var searchButton = document.querySelector(".search-btn");
 var currentWeatherDiv = document.querySelector(".current-weather")
 var weatherCardsDiv = document.querySelector(".weather-cards")
 var locationButton = document.querySelector(".location-btn")
 var recentSearches = []
 var searchHistory = document.getElementById("recent-searches")
 var API_KEY = "6373a3bec1231c9f6ff6230c3876cca2" // API key for openweathermap api
 
 var createWeatherCard = (cityName, weatherItem, index) => {
    if(!recentSearches.includes(cityName)) {
         recentSearches.push(cityName)
         localStorage.setItem("searchHistory" ,recentSearches)
    }
       
    if(index === 0) { // html for main weather card
        return `
                <div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} km/h</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon"> 
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // html for 5 days forecast
        return `
                <li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon"> 
                    <h6>Temp : ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${ weatherItem.wind.speed} km/h</h6>
                    <h6>Humidity: ${ weatherItem.main.humidity}%</h6>
                </li>`;
    }
 }

// searchHistory.addEventListener("load", loadSearchHistory)
function loadSearchHistory() {
    var recentSearches = localStorage.getItem("searchHistory").split(",")
    for (var i = 0; i < recentSearches.length; i++) {
        var recentButton = document.createElement("button");
        // var buttonContent = document.createTextNode(recentSearches[i])
        recentButton.textContent = recentSearches[i];
        recentButton.setAttribute("onclick", `getRecentCityCoordinates("${recentSearches[i]}")`)
        recentButton.setAttribute("id", "recentBtn");
        searchHistory.appendChild(recentButton);
        
        
    }
}

var getRecentCityCoordinates = (cityName) => {
    if (!cityName) return; // return if cityName is empty
    var GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    // get entered city coordinates (latitude, longitude and name) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`No coordinates found for ${cityName}`)
        var { name, lat, lon } = data[0];
    getWeatherDetails(name, lat, lon)
    }).catch(() => {
        alert("An error occured while fetching the coordinates!");
    });
 }


 var getWeatherDetails = (cityName, latitude, longitude) => {
    var WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        var uniqueForecastDays = [];
        var fiveDaysForecast = data.list.filter(forecast => {
            var forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        cityInput.value = "";
        weatherCardsDiv.innerHTML = "";
        currentWeatherDiv.innerHTML = "";

        // creating weather cards and adding them to the dom
        fiveDaysForecast.forEach((weatherItem, index) => {
            var html = createWeatherCard(cityName, weatherItem, index)
            if(index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
            
        })
    }).catch(() => {
        alert("An error has occured while fetching the weather forecast!");
    });
 }

 var getCityCoordinates = () => {
    var cityName = cityInput.value.trim(); // gets city name and removes any spaces
    if (!cityName) return; // return if cityName is empty
    var GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    // get entered city coordinates (latitude, longitude and name) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`No coordinates found for ${cityName}`)
        var { name, lat, lon } = data[0];
    getWeatherDetails(name, lat, lon)
    }).catch(() => {
        alert("An error occured while fetching the coordinates!");
    });
 }

var getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            var { latitude, longitude } = position.coords;
            var Coordinates_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(Coordinates_API_URL).then(res => res.json()).then(data => {
                var { name } = data[0];
                // console.log(data[0])
                // console.log(name)
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occured while fetching the city name!");
            })
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}

 locationButton.addEventListener("click", getUserCoordinates)
 searchButton.addEventListener("click", getCityCoordinates);
 cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

 loadSearchHistory();