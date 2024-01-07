# Weather-Dashboard

## Description
This weather dashboard is a simple application where we were required to apply our knowledge on server side APIs, local storage, basic HTML, CSS and JavaScript. The application allows the user to search any city in the world to view its current forecast and the forecast over the next five days. It works by searching a city in the search bar, then by clicking search or pressing the 'enter' key, the current forecast and the predictied forecast over the next five days of that city pops up. Additionally, if for whatever reason you are lost and/or have forgotten where you were last, you can use the Current Location button to find out which city you are in.

The application displays following weather variables:
- City name
- Current date and the next five days' date
- Temperature in °C
- Wind in KMH
- Humidity in %
- Weather Icon

When a city is searched, the name of that city is then displayed under Recent Searches, allowing you to click on any city there, showing you the current weather and the weather oer the next 5 days of that chosen city. 

The application was creating as a homework challenge from the USYD Coding Bootcamp. Below is the user story and acceptance criteria demonstrating its requirements.

### User Story
    AS A traveler
    I WANT to see the weather outlook for multiple cities
    SO THAT I can plan a trip accordingly

### Acceptance Criteria
    GIVEN a weather dashboard with form inputs
    WHEN I search for a city
    THEN I am presented with current and future conditions for that city and that city is added to the search history
    WHEN I view current weather conditions for that city
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
    WHEN I view future weather conditions for that city
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    WHEN I click on a city in the search history
    THEN I am again presented with current and future conditions for that city

## Features of the application
- JavaScript (Responsible for dynamically creating DOM elements)
- CSS (Styling)
- Open Weather API

