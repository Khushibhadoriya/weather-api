// Step 1: Select HTML elements
const button = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

// Step 2: Add event listener to the button
button.addEventListener("click", () => {
  const city = cityInput.value.trim(); // Remove extra spaces
  if (city === "") {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  fetchWeather(city); // Call function to fetch weather data
});

// Step 3: Function to fetch weather
async function fetchWeather(cityName) {
  const apiKey = "073c75b58944fc237a29a0d626d60b72"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url); // Fetch data from API
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json(); // Convert response to JSON
    showWeather(data); // Call function to display data
  } catch (error) {
    resultDiv.innerHTML = ` ${error.message}`;
  }
}

// Step 4: Function to display weather info
function showWeather(data) {
  const { name, main, weather } = data; // Destructure JSON data

  resultDiv.innerHTML = `
    <h2>${name}</h2>
    <p> Temperature: ${main.temp}°C</p>
    <p> Condition: ${weather[0].description}</p>
  `;
}
