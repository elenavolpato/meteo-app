import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"

const aqiDictionary = [
  { aqi: 1, name: "Good" },
  { aqi: 2, name: "Fair" },
  { aqi: 3, name: "Moderate" },
  { aqi: 4, name: "Poor" },
  { aqi: 5, name: "Very Poor" },
]

const PollutionStatus = (props) => {
  const { lon, lat } = props

  const [weatherData, setWeatherData] = useState(null)
  const getPollutionStatus = () => {
    fetch(`/api/pollution?lat=${lat}&lon=${lon}`)
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error("Error in fetching current weather data")
      })
      .then((data) => {
        setWeatherData(data)
        //console.log("pollution", data)
      })
      .catch((err) => {
        console.error("error fetching data", err)
      })
  }

  const getAqiName = (aqiValue) => {
    return aqiDictionary.find((item) => item.aqi === aqiValue)?.name
  }

  const getColorByAqi = (aqi) => {
    switch (aqi) {
      case 1:
        return "success"
      case 2:
        return "info"
      case 3:
        return "secondary"
      case 4:
        return "warning"
      case 5:
        return "danger"
      default:
        return "secondary"
    }
  }

  useEffect(() => {
    if (lat && lon) {
      getPollutionStatus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon])
  if (!lat || !lon) return null

  return (
    <Col
      xs={12}
      lg={7}
      className="border border-1 border-white-50 rounded p-4 light-bg align-items-center "
    >
      {weatherData?.list?.[0]?.components && (
        <Row>
          <h5>Air quality</h5>
          <Col
            xs={3}
            className="mt-2"
          >
            <p
              className={`fw-bold fs-3 text-${getColorByAqi(weatherData.list[0].main.aqi)}`}
            >
              {getAqiName(weatherData.list[0].main.aqi)}
            </p>
          </Col>
          <Col xs={7}>
            <div className="d-flex">
              {Object.entries(weatherData.list[0].components).map(
                ([key, value]) => (
                  <Col
                    xs={2}
                    key={key}
                    className="text-center"
                  >
                    <p className="fw-bolder ">{key.toUpperCase()}</p>
                    <p>{value}</p>
                  </Col>
                ),
              )}
            </div>
          </Col>
        </Row>
      )}
    </Col>
  )
}

export default PollutionStatus
