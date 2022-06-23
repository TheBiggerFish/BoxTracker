
function BoxListItem({box}) {
  const {name, location, desc} = box
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <p>{name} -- {location} -- {desc}</p>
    </div>
  )
}

export {BoxListItem}