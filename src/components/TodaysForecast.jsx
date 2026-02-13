import { Col, Row } from "react-bootstrap"
import weatherDescriptions from "../data/weatherDescriptions.json"

const TodaysForecast = (props) => {
  const { weatherData, capitalizeFirstLetter } = props
  const convertTempToCelsius = (temp) => (temp - 273.15).toFixed(1) + " °C"

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
          lg={4}
          className="border border-1 border-white-50 rounded p-4 light-bg m-0 align-items-center"
        >
          <Row className="d-flex justify-content-center align-items-center mt-3">
            <Col>
              <i
                className={`bi ${renderCurrentConditions(weatherData.weather[0].main, weatherData.weather[0].description)} mt-1 large-icon`}
              ></i>
              <p>{capitalizeFirstLetter(weatherData.weather[0].description)}</p>
            </Col>
            <Col xs={7}>
              <p className="fs-1 fw-bold mt-1 mb-0">
                {convertTempToCelsius(weatherData.main.temp)}
              </p>
              <p>
                Feels like: <br />
                {convertTempToCelsius(weatherData.main.feels_like)}
              </p>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="fs-5 fw-medium">
              <i className="bi bi-arrow-down text-info"></i>
              {convertTempToCelsius(weatherData.main.temp_min)}
            </Col>
            <Col className="fs-5 fw-medium">
              <i className="bi bi-arrow-up text-danger"></i>
              {convertTempToCelsius(weatherData.main.temp_max)}
            </Col>
          </Row>
        </Col>
      )}
    </>
  )
}

export default TodaysForecast
