function displayTemperature(response) {
  console.log("API response:", response.data); // ✅ Debugging line

  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#weather-icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);

  temperatureElement.innerHTML = `${temperature}°C`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = description;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", description);
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} mph`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-search").value.trim();
  if (!cityInput) return;

  let apiKey = "b8e4c9bea5b1fcaco0bf15019t432341";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;

  console.log("Requesting:", apiUrl); // ✅ Debugging line

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Sorry, we couldn't find that city. Please try again.");
    });
}

// Attach event listener
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);

// Load initial date
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
