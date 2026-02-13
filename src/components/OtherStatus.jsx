import { Col, Row } from "react-bootstrap"

const OtherStatus = (props) => {
  const toKmh = (speed) => (speed * 3.6).toFixed(1)
  return (
    <Col
      className="border border-1 border-light rounded  light-bg m-3"
      xs={12}
      md={4}
    >
      <Row className="align-items-center">
        <Col className="align-items-center pt-4 col-5">
          <h5>Air Other</h5>
          <p className="fs-1 r">{props.weatherData.main.humidity} %</p>
        </Col>
        <Col className="col-7">
          <h5>Wind</h5>
          <Row className="pt-3">
            <Col>
              <span className="fs-4">
                {toKmh(props.weatherData.wind.speed)}
              </span>{" "}
              km/h
            </Col>
            <Col>
              <span className="fs-4">{props.weatherData.wind.deg}</span> deg
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}

export default OtherStatus
