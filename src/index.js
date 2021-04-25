let now = new Date();
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${hour} : ${minutes}`;

function showTemeperature(response){
let temperature= Math.round(response.data.main.temp);
let currentTemperature= document.querySelector("#temperature");
currentTemperature.innerHTML= `${temperature} ℃`;
let city= response.data.name;
let currentCity= document.querySelector("#city");
currentCity.innerHTML=`${city}`;
document.querySelector("#wind").innerHTML=response.data.wind.speed;

}
function citySearch(event){
  event.preventDefault();
  let city= document.querySelector("#enter-city").value;
  let units="metric";
  let apiKey="8aefcb8b0d435a4e0694947bbcb7132d";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemeperature);
}
let cityForm=document.querySelector("#city-search-form");
cityForm.addEventListener("click", citySearch);

//convert temperature//

function convertCelsius(event) {
  event.preventDefault();
  let temperatureConvert = document.querySelector("#temperature");
  temperatureConvert.innerHTML = "17℃";
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureConvert = document.querySelector("#temperature");
  temperatureConvert.innerHTML = "66℉";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

