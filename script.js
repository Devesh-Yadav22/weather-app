const api = {
  key: "dfcca1255f32346b99c46b1e59bb7732",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn'); // Get the new button
const weatherInfo = document.getElementById('weather-info'); // Get the hidden main section

// Allows searching by pressing Enter
searchbox.addEventListener('keypress', setQuery);

// Allows searching by clicking the button
searchBtn.addEventListener('click', () => {
    if (searchbox.value.trim() !== "") {
        getResults(searchbox.value);
    }
});

function setQuery(evt) {
  if (evt.keyCode == 13 || evt.key === 'Enter') {
    if (searchbox.value.trim() !== "") {
        getResults(searchbox.value);
    }
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      if (!weather.ok) {
          throw new Error("City not found");
      }
      return weather.json();
    })
    .then(displayResults)
    .catch(error => {
        console.error(error);
        alert("Could not find that city. Please check the spelling.");
    });
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  
  // Make the weather details visible ONLY after data is loaded successfully
  weatherInfo.style.display = "flex";
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}