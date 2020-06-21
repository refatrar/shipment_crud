import React from "react"

const CargoSingleRow = (props) => {
    const data = props.data

    return (
        <tr>
            <td>{ data.type }</td>
            <td>{ data.description }</td>
            <td>{ data.volume }</td>
        </tr>    
    )
}

export default CargoSingleRow