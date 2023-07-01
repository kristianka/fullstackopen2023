/* eslint-disable react/prop-types */

import Country from "./Country";

const Countries = ({ countriesData, searchQuery, apiKey }) => {
    // Display countries matching search query
    // console.log(`c.name.common ${c.name.common.toUpperCase()} searchQuery ${searchQuery.toUpperCase()}`)

    // Remove countries that don't match the search query
    const filteredCountries = countriesData.filter(c => c.name.common.toUpperCase().includes(searchQuery.toUpperCase()));

    if (filteredCountries.length > 10) {
        return (
            <p>Too many matches, please narrow down the search query</p>
        )
    } else {
        return (
            <div>
                {countriesData.map(c =>
                    c.name.common.toUpperCase().includes(searchQuery.toUpperCase()) &&
                    <Country key={c.name.common} data={c} filteredCountries={filteredCountries} apiKey={apiKey} />)
                }
            </div>
        );
    }
}

export default Countries;
