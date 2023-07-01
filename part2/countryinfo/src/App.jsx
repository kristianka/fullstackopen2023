import { useEffect, useState } from 'react'
import Countries from "./components/Countries"
import axios from "axios"

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    document.title = "Country info";
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(res => {
        // sort alphabetically by country name
        const sorted = res.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountriesData(sorted);
      });
  }, []);

  return (
    <>
      <div>
        <form action="" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name">Search countries</label>
          <input name="name" type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        </form>
      </div>
      <div>
        <Countries countriesData={countriesData} searchQuery={searchQuery} />
      </div>
    </>
  )

}

export default App
