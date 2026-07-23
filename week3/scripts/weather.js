// Select the HTML elements we need to update
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

// Trier, Germany coordinates
const lat = "49.75";
const lon = "6.64";
const units = "imperial";
const apiKey = "b4b50f84cda2c20906936f4ef2e9e324";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = data.main.temp;

  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);

  captionDesc.innerHTML = data.weather[0].description;
}

apiFetch();