import React, {useRef, useState, useEffect } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": cloud_icon,
    "50n": cloud_icon,
  }


  const search = async (city) => {
    if(city === ""){
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();
      if(!res.ok){
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        wind: Math.floor(data.wind.speed * 3.6),
        temperature: Math.floor(data.main.temp),
        city: data.name,
        icon: icon,
      })
      //console.log(data);

    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(()=>{
    search("Uttar Pradesh");
  }, [])
  

  return (
    <div>
      <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>{search(inputRef.current.value)}} />
        </div>
        {weatherData ? <>
          <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}&deg;C</p>
        <p className='location'>{weatherData.city}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.wind} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </> :<></>}
        
      </div>  
    </div>
  )
}

export default Weather
