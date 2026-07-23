// ==========================================
// UYO CHAMBER OF COMMERCE
// Weather Script
// WDD 231
// ==========================================

const apiKey = "1e4115d048a0827ec91eeb4f24fdef15";

const lat = 5.0378;
const lon = 7.9128;

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const weatherCurrent = document.querySelector("#weatherCurrent");
const weatherForecast = document.querySelector("#weatherForecast");

// Get current weather
const getCurrentWeather = async() =>{

    try{

        const response = await fetch(currentWeatherURL);

        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        displayCurrentWeather(data);

    }catch(error){

        console.error("Unable to load current weather.", error);

        weatherCurrent.innerHTML = `
            <p>Weather data is currently unavailable.</p>
        `;
    }

};

// Display current weather
const displayCurrentWeather = (data) =>{

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    weatherCurrent.innerHTML = `
        <img
            src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
            alt="${description}"
            width="80"
            height="80">

        <p class="temp">${temp}&deg;C</p>

        <p class="description">${description}</p>
    `;

};

// Get 3-day forecast
const getForecast = async() =>{

    try{

        const response = await fetch(forecastURL);

        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        displayForecast(data);

    }catch(error){

        console.error("Unable to load forecast.", error);

        weatherForecast.innerHTML = `
            <p>Forecast data is currently unavailable.</p>
        `;
    }

};

// Display 3-day forecast (picks the midday entry for each of the next 3 days)
const displayForecast = (data) =>{

    const dailyEntries = data.list.filter((entry) =>
        entry.dt_txt.includes("12:00:00")
    );

    const nextThreeDays = dailyEntries.slice(0,3);

    weatherForecast.innerHTML = "";

    nextThreeDays.forEach((entry) =>{

        const date = new Date(entry.dt_txt);

        const dayName = date.toLocaleDateString("en-US",{ weekday:"short" });

        const temp = Math.round(entry.main.temp);

        const description = entry.weather[0].description;

        const iconCode = entry.weather[0].icon;

        const dayCard = document.createElement("div");
        dayCard.classList.add("forecast-day");

        dayCard.innerHTML = `
            <h4>${dayName}</h4>

            <img
                src="https://openweathermap.org/img/wn/${iconCode}.png"
                alt="${description}"
                width="50"
                height="50">

            <p>${temp}&deg;C</p>

            <p>${description}</p>
        `;

        weatherForecast.appendChild(dayCard);

    });

};

// Load weather data when page opens
getCurrentWeather();
getForecast();