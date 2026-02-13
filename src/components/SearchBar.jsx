import { useState } from "react"
import { InputGroup, Form, Button, Col } from "react-bootstrap"

const SearchBar = (props) => {
  const [searchVal, setSearchVal] = useState("")

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value)
  }

  const handleSearchClick = () => {
    props.handleSearchClick(searchVal) // Pass the search value to parent
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick()
    }
  }
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search city name"
        aria-label="search"
        aria-describedby="basic-addon1"
        value={searchVal}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </InputGroup>
  )
}
export default SearchBar
