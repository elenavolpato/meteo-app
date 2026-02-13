import { Container, Row } from "react-bootstrap"
import TodaysForecast from "../components/TodaysForecast"
import PollutionStatus from "../components/PollutionStatus"
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
      .then((data) => {
        setWeatherData(data)
        setIsLoading(false)
        console.log("weather data", weatherData)
      })
      .catch((err) => {
        console.error("error fetching data", err)
        setIsLoading(false)
      })
  }

  const capitalizeFirstLetter = (city) => {
    return (
      String(city).charAt(0).toUpperCase() + String(city).slice(1).toLowerCase()
    )
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
      <h1 className="mt-5 text-center title">Do I need a umbrella? </h1>
      <Container
        className="d-flex flex-column justify-content-center align-items-center
        h-100 pt-5 "
      >
        <SearchBar handleSearchClick={handleSearchClick} />
        <h2>Weather forecast for {capitalizeFirstLetter(searchedCity)}</h2>
        <Row className="gap-3 container-fluid justify-content-center my-3">
          {isLoading && <Loading />}
          {weatherData && (
            <TodaysForecast
              weatherData={weatherData}
              capitalizeFirstLetter={capitalizeFirstLetter}
            />
          )}
          {isLoading && <Loading />}
          {weatherData && (
            <ThreeHoursForecast
              lon={weatherData.coord.lon}
              lat={weatherData.coord.lat}
              apiKey={apiKey}
            />
          )}
        </Row>
        <Row className="gap-3 container-fluid justify-content-center">
          {isLoading && <Loading />}
          {weatherData && (
            <PollutionStatus
              lon={weatherData.coord.lon}
              lat={weatherData.coord.lat}
              apiKey={apiKey}
            />
          )}
          {isLoading && <Loading />}
          {weatherData && <OtherStatus weatherData={weatherData} />}
        </Row>
      </Container>
    </>
  )
}
export default Home
