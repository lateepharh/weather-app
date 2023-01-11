//current day
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const date = new Date().getDate();
const day = new Date().getDay();
const act = weekday[day];
let month = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
const mm = month[new Date().getMonth()];
const yy = new Date().getFullYear();
const ddd = date;
document.getElementById("time").innerHTML = act + "," +" " + date +" " + mm+" "+ yy;
// document.getElementById("times").innerHTML = act + "," +" " + date +" " + mm+" "+ yy;

// digital clock
function showTime(){
   var date = new Date();
   var h = date.getHours();
   var m = date.getMinutes();
   var s = date.getSeconds();
   var session = "AM";
   if (h == 0) {
      h = 12;
   }
   if (h > 12) {
      h = h - 12;
      session = "PM";
   }
   h = (h < 10) ? "0" + h : h;
   m = (m < 10) ? "0" + m : m;
   s = (s < 10) ? "0" + s : s;
   var time = h + " :" + m + ":" + s + " " + session;
   document.getElementById("digital").innerHTML = time;
   document.getElementById("digital").textContent = time;
//    document.getElementById("digitals").textContent = time;
//    document.getElementById("digital").innerHTML = time;
    setTimeout(showTime,1000);
}
showTime();
const Weather_API = "b0c5b4b09b7ade16e66e9fd4cface718";
const inputE = document.querySelector("#input");
const searchBtn = document.querySelector("#search-btn");
const weatherData =document.querySelector(".weather-data-container");
const weatherError = document.querySelector(".text-error");
//fetching weather data
const fetchData = () =>{
    const input = inputE.value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${Weather_API}&units=metric`
    fetch(weatherUrl)
    .then((response)=> response.json())
    .then((data)=>{
        const {main, name, sys, weather,wind,} = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        const weatherInfo = document.createElement("div");
        weatherInfo.innerHTML= `
           <div class ="city-data">
              <h2 class="city-name">
                  <span>${name}</span>
                   <sup>${sys.country}</sup>
                </h2>
                <div class ="city-temp">Temp:    ${Math.round(main.temp)}
                <sup>&#8451</sup
                </div>
                <div class= "wind">Wind:    ${wind.speed}km/h</div>
                <div>
                   <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                </div>
                <div>${weather[0]["description"]}</div>
            </div>
        `;
        weatherData.appendChild(weatherInfo)
    })
    .catch(()=>{
        weatherError.textContent= "please enter a valid Country / City!!"
    })
}
searchBtn.addEventListener('click',()=>{
    fetchData();
    inputE.value = "";
});
// const Cout = document.querySelector("#onclick");
function myFunction(){
    const Cout = document.querySelector("#onclick");
    const info = document.querySelector("#info");
    const input =  Cout.textContent;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${Weather_API}&units=metric`
    fetch(weatherUrl)
    .then((response)=> response.json())
    .then((data)=>{
        const {main, name, sys, weather,wind,} = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        const weatherInfo = document.createElement("div");
        weatherInfo.innerHTML= `
            <p>${Math.round(main.temp)} <sup>&#8451</sup></p>
        `;
        info.appendChild(weatherInfo)
    })
    .catch(()=>{
        weatherError.textContent= "please enter a valid Country / City!!"
    })

};
myFunction();
// For geolocation detection
const API_key = "b5c066ad9a424d1ab2c2dee4573bd1da";
const locality = document.querySelector("#locality");
// const localitys = document.querySelector("#localitys");
const localDeg = document.querySelector("#locality-deg")
function myFunc(){
    confirm("Do you want your location detected");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSucess,onError);
    }else{
        alert("something went wrong")
    }

    function onSucess(position){
        alert("Detecting your location")
       let {latitude, longitude} = position.coords;
       fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_key}`)
       .then(response => response.json()).then(response =>{ let allDetails = response.results[0].components;
           console.table(allDetails);
           let {county, state, country} = allDetails;
            locality.textContent=`${county}, ${state}, ${country}`;
        }).catch(()=>{
            locality.textContent= " Something Went Wrong"
        })
    }
    function onError(error){
       if (error.code == 1) {
           alert("deneid")
        }else if (error.code == 2) {
            alert("unavailable")
        }else{
            alert("wrong")
        }
        locality.setAttribute("disabled","true")

    }
    const input =  locality.textContent;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${Weather_API}&units=metric`
    fetch(weatherUrl)
    .then((response)=> response.json())
    .then((data)=>{
        const {main, name, sys, weather,wind,} = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
        const weatherInfo = document.createElement("div");
        weatherInfo.innerHTML= `
            <p>${Math.round(main.temp)} <sup>&#8451</sup></p>
        `;
        localDeg.appendChild(weatherInfo)
    })
    .catch(()=>{
        weatherError.textContent= "please enter a valid Country / City!!"
    })

}
myFunc();