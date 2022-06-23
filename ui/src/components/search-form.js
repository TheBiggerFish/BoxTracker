import * as React from 'react'
import {FaSearch, FaTimes, FaSpinner} from 'react-icons/fa'
import * as colors from '../styles/colors'
import {Form,FormControl, InputGroup,Button, DropdownButton, Dropdown} from 'react-bootstrap'
import {useQuery,updateQuery} from '../contexts/query-context'

function SearchForm() {
  const [text, setText] = React.useState("")
  const [searchField, setSearchField] = React.useState("Boxes-7")
  const [{query, status}, queryDispatch] = useQuery()
  const {queried} = query

  const isLoading = status === "pending"
  const isError = status === "rejected"

  function handleSubmit(event) {
    event.preventDefault()
    updateQuery(queryDispatch, query, {
      text,
      queried: true,
      fields: parseInt(searchField.split('-')[1]),
    })
  }

  <InputGroup>
    <Form.Control type="query" placeholder={isError ? "There was an error" : "Enter search text"} />
  </InputGroup>

  return (
    <div>
      <InputGroup>
        <DropdownButton
          variant="dark"
          title={searchField.split('-')[0]}
          onSelect={(eventKey, _) => setSearchField(eventKey)}
          navbar={true}
        >
          <Dropdown.Item eventKey="Boxes-7">Boxes</Dropdown.Item>
          <Dropdown.Item eventKey="Contents-8">Contents</Dropdown.Item>
        </DropdownButton>
        <FormControl
          type="text" 
          placeholder="Enter search text" 
          onChange={event => setText(event.target.value)}
          onKeyPress={event => event.charCode === 13 ? handleSubmit(event) : null}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          {queried && isLoading ? (
            <FaSpinner aria-label="loading" />
          ) : queried && isError ? (
            <FaTimes aria-label="error" css={{color: colors.danger}} />
          ) : (
            <FaSearch aria-label="search" />
          )}
        </Button>
      </InputGroup>
    </div>
  )
}

export {SearchForm};
