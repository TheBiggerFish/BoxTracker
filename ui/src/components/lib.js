import styled from '@emotion/styled/macro'


const inputStyles = {
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
}
const Input = styled.input({borderRadius: '3px'}, inputStyles)
const BoxListUL = styled.ul({
  listSTyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridGap: '1em',
})

export {
  Input,
  BoxListUL
}
