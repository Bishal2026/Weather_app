const time1 = document.getElementById('time');
const date1 = document.getElementById('date');
const currentweatherItem1 = document.querySelector('#current_weater_items');

const timezone = document.getElementById('time_zone');
const country = document.getElementById('country');
const weatherforcast = document.getElementById('weather-forecast');
const temp = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(()=>{
     const time = new Date();
     const month = time.getMonth();
     const date = time.getDate();
     const day = time.getDay();
     const hour = time.getHours();
     const hourin24format = hour >= 13 ? hour %12 :hour;
     const minutes  = time.getMinutes();
     const ampm = hour >=12 ? 'PM' : 'AM';

     time1.innerHTML = hourin24format + ':' + minutes + ' ' +`<span id="am_pm">${ampm}</span>`;

     date1.innerHTML = days[day] + ', ' +date+ ' ' +months[month];
     
     
},1000);


const weather = ()=>{
    navigator.geolocation.getCurrentPosition((success) =>{
        // console.log(success);
        let {latitude,longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        weatherdata(data);

    })
})
}


weather();

function weatherdata(data){

    
    timezone.innerHTML = data.timezone;
    country.innerHTML = data.lat + 'N ' + data.lon+'E'
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    currentweatherItem1.innerHTML= ` <div class="weater_item">
    <p>Hamidity</p>
    <p>${humidity}</p>
</div>
<div class="weater_item">
    <p>Pressure</p>
    <p>${pressure}</p>
</div>
<div class="weater_item">
    <p>Wind Speed</p>
    <p>${wind_speed}</p>
</div>

<div class="weater_item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weater_item">
    <div>Sunset</div>
    <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
</div>`;
let otherDayForcast = ''
data.daily.forEach((day, idx) => {
    if(idx == 0){
       temp.innerHTML = `
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
            <div class="temp">Night - ${day.temp.night}&#176;C</div>
            <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
        
        `
    }else{
        otherDayForcast += `
        <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${day.temp.night}&#176;C</div>
            <div class="temp">Day - ${day.temp.day}&#176;C</div>
        </div>
        
        `
    }
})


weatherforcast.innerHTML = otherDayForcast;
}


