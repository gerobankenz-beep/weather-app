const cityInput = document.querySelector("#cityInput");
const weatherForm = document.getElementById("weatherForm");
const card = document.querySelector(".card");
const apiKey = "d51d5725009719eb12417d0cc404edfd";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        }catch(error){
            displayError(error.message);
        }
    }else{
        displayError("Please enter a city");
    }
})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("😭Could not fetch weather data!");
    }
    return await response.json();
}

function displayWeatherData(data){

    //destructuring the weather data
    const {main: {humidity, temp},
            name: city,
            weather: [{id,description}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    //Creating the display elements
    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const humDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    //mapping text content to the newly added elemnts
    cityDisplay.textContent = `${city} city`;
    tempDisplay.textContent = `Temp: ${temp}°C`;
    humDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `${description}`;
    emojiDisplay.textContent = displayEmoji(id);

    //assigning classses to the newly added elements
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humDisplay.classList.add("humDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("emojiDisplay");

    //adding elements to the parent
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humDisplay);
    card.appendChild(emojiDisplay);
    card.appendChild(descDisplay);
}

function displayEmoji(weatherId){
    switch(true){
    case(weatherId >= 200 && weatherId < 300):
        return "⛈️";
    case(weatherId >= 300 && weatherId < 500):
        return "💧";
    case(weatherId >= 500 && weatherId < 600):
        return "🌧️";
    case(weatherId >= 600 && weatherId < 701):
        return "❄️";
    case(weatherId >= 701 && weatherId < 800):
        return "";
    case(weatherId >= 801 && weatherId < 805):
        return "☁️";
    case(weatherId === 800):
        return "☀️";
    default:
        return "";
}
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    //clearing the display card before appending any child

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}