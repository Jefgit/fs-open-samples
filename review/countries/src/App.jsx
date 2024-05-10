import React, { useEffect, useState } from 'react'
import countriesService from './services/countries'
import { Countries } from './components/Countries';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [countries, setCountries] = useState([])

  const searchCountry = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    if(searchText){
      countriesService
      .search(searchText)
      .then(countries => {
        setCountries(countries)
        console.log(countries)
      })
      .catch((e) => {

      })
    }
    
  },[searchText])

  return (
    <div>
      find countries <input type="text" value = {searchText} onChange={searchCountry}/>
      <Countries countries={countries} setCountries = {setCountries} />
    </div>
  )
}

export default App