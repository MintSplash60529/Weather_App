const weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=50.7687&longitude=0.2845&current=rain&daily=temperature_2m_max&timezone=Europe%2FLondon&forecast_days=1";
const currentTemperature = document.getElementById("current-temperature");
const isItRaining = document.getElementById("rain");
const imgDiv = document.getElementById("img-div");
const itemToWearText = document.getElementById("item-to-wear");
const refreshBtn = document.getElementById("refresh-btn");

let itemToWear;

const fetchData = async () => {
    const res = await fetch(weatherApi);
    const data = await res.json();
    const temperature = data.daily.temperature_2m_max[0];
    const rain = data.current.rain;
    update(temperature, rain);

}

const update = (temperature, rain) => {
    currentTemperature.textContent = `Todays Temperature: ${temperature}℃`;
    isItRaining.textContent = rain > 0 ? "Rain? Yes": "Rain? No";
    if (rain > 0) {
        itemToWear = "waterproof_coat";
    } else if (temperature < 14) {
        itemToWear = "coat";
    } else if (temperature < 20) {
        itemToWear = "hoodie";
    } else {
        itemToWear = "t-shirt";
    }

    imgDiv.innerHTML = `<img src="images/${itemToWear}.jpg"/>`
    itemToWearText.textContent = itemToWear.replace("_", " ")
}

fetchData();

refreshBtn.addEventListener("click", fetchData);