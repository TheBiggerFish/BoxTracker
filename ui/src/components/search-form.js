import * as React from 'react'
import {useQuery} from 'react-query'
import {FaSearch, FaTimes, FaSpinner} from 'react-icons/fa'
import {client} from '../utils/api-client'
import * as colors from '../styles/colors'
import {Form, InputGroup,Button, DropdownButton, Dropdown, ButtonGroup, NavDropdown} from 'react-bootstrap'

function SearchForm() {
  const [text, setText] = React.useState('')
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)
  const [searchField, setSearchField] = React.useState("Boxes")

  const {
    data: boxes = [],
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["boxSearch", {query}],
    queryFn: () => client(`search?query=${query}&fields=15`)
  })

  function handleSubmit(event) {
    event.preventDefault()
    setQuery(text)
    setQueried(true)
  }

  <InputGroup>
    <Form.Control type="query" placeholder="Enter search text" />
  </InputGroup>

  return (
    <div>
      <InputGroup>
        <DropdownButton
          variant="dark"
          title={searchField}
          onSelect={(eventKey, _) => setSearchField(eventKey)}
          navbar={true}
        >
          <Dropdown.Item eventKey="Boxes">Boxes</Dropdown.Item>
          <Dropdown.Item eventKey="Contents">Contents</Dropdown.Item>
        </DropdownButton>
        <Form.Control
          type="text" 
          placeholder="Enter search text" 
          onChange={(event) => setText(event.target.value)}
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
      {/* {queried && isError ? (
        <div css={{color:colors.danger}} >
          <p>There was an error</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {queried && isSuccess ? (
        boxes.length > 0 ? (
          <BoxListUL css={{marginTop: 20}}>
            {boxes.map(box => (
              <li key={box._id} aria-label={box.name}>
                <BoxListItem key={box._id} box={box} />
              </li>
            ))}
          </BoxListUL>
        ) : (
          <p>{boxes.length} boxes total</p>
        )
      ) : null} */}
    </div>
  )
}

export {SearchForm};
