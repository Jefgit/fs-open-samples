import React from 'react'
import { Country } from './Country'
import { Weather } from './Weather'

export const Countries = ({countries, setCountries}) => {
    if(!countries){
        return null
    }

    const showCountries = countries.length > 10 ?  <p>Too many matches, specify another filter</p>
    : countries.length !== 1 ? <ul>{countries.map((country) => <li key ={country.ccn3}>{country.name.common}<button key ={country.ccn3} onClick={() => setCountries([country])}>show</button></li>)}</ul> 
    : countries.length == 1 ? <div><Country country = {[...countries]} /> <Weather  country = {[...countries]}/></div>
    : ""
  return (
    <div>
        {
            showCountries
        }
    </div>
  )
}
