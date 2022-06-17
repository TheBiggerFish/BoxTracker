import * as React from 'react'

function SearchForm() {
    const inputRef = React.useRef()
    const [input, setInput] = React.useState()
    const [error, setError] = React.useState()

    function handleChange(event) {
        setInput(event.target.value)
        
    }

    return (
        <form>
            <label htmlFor="textInput">Type here:</label>
            <input id="textInput" ref={inputRef} onChange={handleChange} value={input} />
        </form>
    )
}

export {SearchForm};
