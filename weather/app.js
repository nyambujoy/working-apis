const weatherForm = document.getElementById('myform');
const enterInput = document.querySelector('.enterCity');
const card = document.querySelector('.card');
const apiKey = 'f34204aa406630756ecd8c9cb749b372';
console.log(enterInput);

// console.log(weatherForm, enterInput, card)
// console.log("hello")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getCity()

})

async function getCity() {
    const city = enterInput.value.trim()

    if (city === '') {
        enterInput.setAttribute('placeholder', 'please enter a city')
        return;
    } else {
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData)
    }
    console.log(city)
    return city

}



async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl)
    // console.log(response)

    if (!response.ok) {
        card.style.display = 'flex'
        card.textContent = 'could not find city';
        throw new Error("could not fetch weather data");
    } else {
        return await response.json()
    }

}

function displayWeatherInfo(data) {
    console.log(data)
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1')
    cityDisplay.classList.add('cityDisplay')
    cityDisplay.textContent = city;

    const tempDis = document.createElement('p')
    tempDis.classList.add('tempDis')
    // const temperature = Math.round()
    tempDis.textContent = `${(temp - 273.15).toFixed(1)}\u00B0C`

    const humidityDis = document.createElement('p')
    humidityDis.classList.add('humidityDis')
    humidityDis.textContent = `humidity: ${humidity}%`



    const descDisplay = document.createElement('p')
    descDisplay.classNmae = 'descDisplay '
    descDisplay.textContent = description


    const weatherEmoji = document.createElement('p')
    weatherEmoji.classList.add('weatherEmoji')
    weatherEmoji.textContent = getWeatherEmoji(id)


    const error = document.createElement('p')
    error.className = 'error'
    error.textContent = '';
    //

    card.append(cityDisplay, tempDis, humidityDis, descDisplay, weatherEmoji);

}

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return '🌩️🌩️';
        case (weatherId >= 300 && weatherId < 400):
            return '🌦️🌦️';
        case (weatherId >= 500 && weatherId < 600):
            return '🌧️🌧️';
        case (weatherId >= 600 && weatherId < 700):
            return '❄️';
        case (weatherId >= 700 && weatherId < 800):
            return '🌫️🌫️';
        case (weatherId === 800):
            return '☀️';
        case (weatherId >= 801):
            return '☁️☁️';
        default:
            return '☁️☁️';
    }

}