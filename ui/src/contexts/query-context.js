
import {client} from '../utils/api-client'
import * as React from 'react'

const QueryContext = React.createContext()
QueryContext.displayName = 'QueryContext'

function queryReducer(state, action) {
  switch (action.type) {
    case 'start update': {
      return {
        ...state,
        status: 'pending',
        query: {...state.query, ...action.updates},
        storedQuery: state.query,
      }
    }
    case 'finish updates': {
      return {
        ...state,
        status: 'resolved',
        query: {...state.query, ...action.updates},
        storedQuery: null,
        error: null,
      }
    }
    case 'fail update': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
        query: state.storedQuery,
        storedQuery: null,
      }
    }
    case 'reset': {
      return {
        ...state,
        status: null,
        error: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function QueryProvider({children}) {
  const defaultQuery = {
    text: '',
    fields: 7,
    result: [],
    queried: false,
  }
  const value = React.useReducer(queryReducer, {
    status: null,
    error: null,
    query: defaultQuery,
    storedQuery: defaultQuery,
  })
  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
}

function useQuery() {
  const context = React.useContext(QueryContext)
  if (context === undefined) {
    throw new Error('useQuery must be used within a QueryProvider')
  }
  return context
}

function updateQuery(dispatch, query, updates) {
  const text = "text" in updates ? updates.text : query.text
  const fields = "fields" in updates ? updates.fields : query.fields

  dispatch({type: 'start update', updates})
  return client(`search?query=${text}&fields=${fields}`).then(
    result => dispatch({type: 'finish updates', updates: {result}}),
    error => dispatch({type:'failed load', error})
  )
}

export {QueryProvider, useQuery, updateQuery}
