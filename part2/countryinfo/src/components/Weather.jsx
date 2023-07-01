/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ filteredCountries, name, lat, lon }) => {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        try {
            // API KEY HERE!!!! I was unable to get process working on Windows
            // since this is a frontend. It would be too much work to create a
            // backend just for this.
            const apiKey = process.env.REACT_APP_API_KEY;
            if (lat !== null && lon !== null && filteredCountries.length === 1) {
                document.title = `${name} info`;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                    .then(res => {
                        setWeather(res.data);
                        console.log(weather);
                    })
                    .catch(err => {
                        console.log("errr!!!", err);
                        setWeather(undefined)
                    })
            }
        } catch (err) {
            console.log(`Error fetching weather api: ${err.message}`)
        }
    }, [filteredCountries.length, lat, lon, name])

    return (
        <div>
            <h3>Weather in {name}</h3>
            <p>Temperature: {weather?.main?.temp !== undefined ? weather.main.temp : "No weather data available :("}  &#8451;</p>
            {weather?.weather && (
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
            )}
            <p>Wind: {weather?.wind?.speed !== undefined ? weather.wind.speed : "No weather data available :("} m/s</p>
        </div>
    )
};

export default Weather;