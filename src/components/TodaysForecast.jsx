import { Col, Row } from "react-bootstrap"
import weatherDescriptions from "../data/weatherDescriptions.json"

const TodaysForecast = ({ weatherData, searchedCity }) => {
  const convertTempToCelsius = (temp) => (temp - 273.15).toFixed(1) + " °C"

  const capitalizeFirstLetter = (city) => {
    return (
      String(city).charAt(0).toUpperCase() + String(city).slice(1).toLowerCase()
    )
  }

  const renderCurrentConditions = (main, description) => {
    const category = main.toLowerCase()
    const weatherIcon =
      weatherDescriptions[category]?.find(
        (item) => item.description === description,
      )?.icon || "bi-question-circle"

    return weatherIcon
  }

  return (
    <>
      {weatherData && (
        <Col
          xs={12}
          md={4}
          className="border border-1 border-light rounded p-4 light-bg m-3  align-items-center"
        >
          <Row className="d-flex justify-content-center">
            <Col>
              <i
                className={`bi ${renderCurrentConditions(weatherData.weather[0].main, weatherData.weather[0].description)} fs-1 mt-1`}
              ></i>
              <p>{capitalizeFirstLetter(searchedCity)}</p>
            </Col>
            <Col>
              <p className="fs-1 fw-bold mt-1 mb-0">
                {convertTempToCelsius(weatherData.main.temp)}
              </p>
              <p>
                Fells like: {convertTempToCelsius(weatherData.main.feels_like)}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>Min {convertTempToCelsius(weatherData.main.temp_min)}</Col>
            <Col>Max {convertTempToCelsius(weatherData.main.temp_max)}</Col>
          </Row>
        </Col>
      )}
    </>
  )
}

export default TodaysForecast
