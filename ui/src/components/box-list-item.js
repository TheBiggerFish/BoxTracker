
function BoxListItem({box}) {
    const {name, location, desc} = box
    return (
        <div>
            <p>{name} -- {location} -- {desc}</p>
        </div>
    )
}

export {BoxListItem}