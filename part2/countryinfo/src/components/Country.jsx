/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useState } from "react";
import Weather from "./Weather"


const Country = ({ data, filteredCountries }) => {
    const [show, setShow] = useState(0);
    const name = data.name.common;
    const { area, capital, flags, languages, latlng } = data;

    const handleShow = () => {
        setShow(!show); // toggle the show useState
    }

    const showData = () => {
        return (
            <div>
                <div>
                    <h2>{name}</h2>
                    <p>Capital: {capital}</p>
                    <p>Area: {area} km<sup>2</sup></p>
                    <p><b>Languages:</b></p>
                    <ul>
                        {Object.values(languages).map(l => <li key={l}>{l}</li>)}
                    </ul>
                    <img src={flags.png} alt={flags.alt} />
                </div>
                <Weather filteredCountries={filteredCountries} name={name} lat={latlng[0]} lon={latlng[1]} />
            </div>
        )
    }

    if (filteredCountries.length === 1) {
        return showData();
    } else {
        return (
            // Render showData() when button clicked
            <li key={name}>{name}<button onClick={handleShow}>Show data</button>
                {show ? showData() : null} </li>
        )
    }
}

export default Country;
