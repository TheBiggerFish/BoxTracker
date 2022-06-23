import {BoxListItem} from '../components/box-list-item'
import {useQuery} from '../contexts/query-context'
import {BoxListUL} from '../components/lib'

function BoxList() {
  const [{query}] = useQuery()
  const {result: boxes} = query

  return (
    boxes.length ? (
      <BoxListUL css={{marginTop: 20}}>
        {boxes.map(box => (
          <li key={box.name} aria-label={box.name}>
            <BoxListItem key={box.name} box={box} />
          </li>
        ))}
      </BoxListUL>
    ) : (
      <p>0 boxes found</p>
    )
  )
}

export {BoxList}
