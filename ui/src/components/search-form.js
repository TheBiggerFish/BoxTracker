import * as React from 'react'
import {useQuery} from 'react-query'
import {BoxListUL, Input} from './lib'
import {FaSearch, FaTimes, FaSpinner} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {client} from '../utils/api-client'
import * as colors from '../styles/colors'
import {BoxListItem} from './box-list-item'
import {Form,InputGroup,Button} from 'react-bootstrap'

function SearchScreen() {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)

  const {
    data: boxes = [],
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['boxSearch', {query}],
    queryFn: () => client(`search?query=${query}&fields=15`)
  })

  function handleSubmit(event) {
    event.preventDefault()
    setQuery(event.target.elements.search.value)
    setQueried(true)
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input 
          placeholder="Search boxes..." 
          id="search" 
          css={{width: '%100'}} 
        />
        <Tooltip label="Search Boxes">
          <label htmlFor='search'>
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft:'-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <FaSpinner aria-label="loading" />
              ) : isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      {queried && isError ? (
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
      ) : null}
    </div>
  )
}

export {SearchScreen};
