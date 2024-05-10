import React, {useEffect, useState} from 'react'
import weatherServices from '../services/weather'
import weather from '../services/weather'

export const Weather = ({country}) => {
    const lat = country[0].latlng[0]
    const long = country[0].latlng[1]
    const [weatherInfo, setWeatherInfo] = useState({temp:0, speed:0, icon:''})
    let temp = 0
    let speed = 0
    let icon = ''
    useEffect(() => {
        weatherServices
        .getWeather(lat, long)
        .then(weatherInfo => {
            console.log(weatherInfo)
            temp = (weatherInfo.main.temp - 273.15).toFixed(2)
            speed = weatherInfo.wind.speed
            icon = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`
            setWeatherInfo({temp, speed, icon})
        })
        .catch((e) => console.log(e))
    }, [])

    console.log(weatherInfo)


    
  return (
    <div>
        <h1>Weather in {country[0].name.common}</h1>
        <p>temperature {weatherInfo.temp} Celcius</p>
        <img src={weatherInfo.icon} alt="" />
        <p>wind {weatherInfo.speed}</p>
    </div>
  )
}
