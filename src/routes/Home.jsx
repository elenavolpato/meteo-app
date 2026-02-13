import { Container, Row } from "react-bootstrap"
import TodaysForecast from "../components/TodaysForecast"
import FiveDaysForecast from "../components/FiveDaysForecast"
import OtherStatus from "../components/OtherStatus"
import ThreeHoursForecast from "../components/ThreeHourForecast"
import SearchBar from "../components/SearchBar"
import Loading from "../components/Loading"
import { useState, useEffect } from "react"

const apiKey = "bc45c3a9cab5095ab402b5746a08d45e"

const Home = () => {
  const [searchedCity, setSearchedCity] = useState("Rio de Janeiro")
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getTodaysWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}`,
    )
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error("Error in fetching current weather data")
      })
      .then((res) => {
        console.log("here", res)
        setWeatherData(res)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("error fetching data", err)
        setIsLoading(false)
      })
  }

  const handleSearchClick = (cityName) => {
    setSearchedCity(cityName)
  }
  useEffect(() => {
    if (searchedCity) {
      getTodaysWeather()
    }
  }, [searchedCity])
  return (
    <>
      <Container>
        <SearchBar handleSearchClick={handleSearchClick} />
        <Row>
          {isLoading && <Loading />}
          {weatherData && (
            <TodaysForecast
              weatherData={weatherData}
              isLoading={isLoading}
              searchedCity={searchedCity}
            />
          )}
          <ThreeHoursForecast />
        </Row>
        <Row>
          <FiveDaysForecast />
          {weatherData && <OtherStatus weatherData={weatherData} />}
        </Row>
      </Container>
    </>
  )
}
export default Home
