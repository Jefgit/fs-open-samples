import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/'

const getAll = () => {
    const request = axios.get(`${baseUrl}all`)
    return request.then(response => console.log(response))
}

const search = (keyword) => {
    const request = axios.get(`${baseUrl}name/${keyword}`)
    return request.then(response => response.data)
}

export default {getAll, search}