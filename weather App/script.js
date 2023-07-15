const apiKey = "ae4fbf75346b90331a7290ce721c07ae";

const weatherDataEle = document.getElementById("weather-data");

const cityInputEle = document.getElementById("city-input");

const formEle = document.querySelector("form");

formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEle.value;
  getWeatherData(cityValue);
});
async function getWeatherData(cityValue) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      throw new Error("Network Response was not ok");
    }

    const data = await res.json();

    const temp = Math.round(data.main.temp);

    const description = data.weather[0].description;

    const icon = data.weather[0].icon;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataEle.querySelector(
      ".icon"
    ).innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-image" width="20px" >`;

    weatherDataEle.querySelector(
      ".temperature"
    ).textContent = `${temp}\u00B0 C`;

    weatherDataEle.querySelector(".description").textContent = description;

    weatherDataEle.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEle.querySelector(
        ".icon"
      ).innerHTML = ``;
  
      weatherDataEle.querySelector(
        ""
      ).textContent = ``;
  
      weatherDataEle.querySelector(".description").textContent = "Data Not Found, Please try again";
  
      weatherDataEle.querySelector(".details").innerHTML = "";
  }
}
