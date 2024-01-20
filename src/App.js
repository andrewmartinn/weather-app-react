import { useState } from "react"
import { FaCloud } from 'react-icons/fa'

function App() {
  // state to hold input data and weather data
  const [query, setQuery] = useState('')
  const [weatherData, setWeatherData] = useState({})

  // api options
  let api = {
    key: "API KEY",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
  }

  // fetch weather data
  const getWeatherData = async () => {
    const response = await fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
    const json = await response.json()
    setWeatherData(json)
  }

  // handle search
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      getWeatherData()
      setQuery('')
    }
  }

  return (
    <div className={(weatherData.weather)
      ? ((weatherData.weather.temp > 16) ? 'App warm' : 'App')
      : 'App'
    }>
      <div className="container">
        <header>
          <h1>React Weather</h1>
          <FaCloud className="icon" />
        </header>
        <div className="form-control">
          <input
            type="text"
            name="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Enter State/City..."
          />
        </div>
        {weatherData.weather && (
          <div className="weather-box">
            <div className="location">{weatherData.name}, {weatherData.sys.country}</div>
            <div className="temperature">{Math.round(weatherData.main.temp)}°C</div>
            <div className="weather-description">{weatherData.weather[0].main}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
