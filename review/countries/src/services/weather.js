import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const APIKey = 'ab84c5c6fd7e64fc5cf4156cb77da7ee'

const getWeather = (lat, long) => {
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${long}&appid=${APIKey}`)
    return request.then(res => res.data)
}

export default {getWeather}