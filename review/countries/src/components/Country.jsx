import React from 'react'

export const Country = ({country}) => {
    const languages = country[0].languages
    const flagIcon = country[0].flags.png
    
    console.log(languages)
  return (
    <div>
        <h1>{country[0].name.common}</h1>
        <p>capital {country[0].capital[0]}</p>
        <p>area {country[0].area}</p> 
        <p>languages:</p>
        <ul>
            {
                Object.values(languages).map((language, i) => <li key={i}>{language}</li>)
            }  
        </ul>    
        <img src={flagIcon} alt="" />
    
    </div>
  )
}
