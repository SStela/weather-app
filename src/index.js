function formatDate(timestamp){
  let date = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
  hour = `0${hour}`;
}
  let minutes = now.getMinutes();
  if(minutes<10){
  minutes=`0${minutes}`;
}
  let day = days[date.getDay()];
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

return `${day}, ${hour}:${minutes}`;
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function forecastDisplay(response){
  let forecast=response.data.daily;
  let forecastElement= document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index){
    if(index < 6){
      forecastHTML= 
      forecastHTML + 
      `<div class="col-2">
      <div class="weather-forecast-date>"${formatDay(forecastDay.dt)}
      </div> 
        <img 
             src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png" 
             class="weather-forecast-icon" 
             alt="" 
             width="36"/>
     <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
        </div>
      </div> `;
    }
  });
  forecastHTML =  forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  let apiKey="8aefcb8b0d435a4e0694947bbcb7132d";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecastDisplay);

}

function showTemeperature(response){
let temperature= Math.round(response.data.main.temp);
let currentTemperature= document.querySelector("#temperature");
currentTemperature.innerHTML= `${temperature} ℃`;
let city= response.data.name;
let currentCity= document.querySelector("#city");
currentCity.innerHTML=`${city}`;
document.querySelector("#wind").innerHTML=`WIND: ${response.data.wind.speed}km/h`;
document.querySelector("#humidity").innerHTML=` HUMIDITY: ${response.data.main.humidity}%`;
/*let currentDate= document.querySelector("#current-date");
currentDate.innerHTML=formatDate(response.data.dt*1000);
let icon=document.querySelector("#current-weather-icon");
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); */

getForecast(response.data.coord);

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


let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);

citySearch("Zagreb");