import React from "react"
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons'

const ShipmentSingleRow = (props) => {
    const data = props.data

    return(
        <tr>
            <td>{ data.id }</td>
            <td>{ data.name }</td>
            <td>{ data.mode }</td>
            <td>{ data.type }</td>
            <td>{ data.destination }</td>
            <td>{ data.origin }</td>
            <td>{ data.total }</td>
            <td>{ data.status }</td>
            <td>{ data.userId }</td>
            <td>
                <Link to={{
                    pathname: '/edit/' + data.id,
                    state: {
                        data: data
                    }
                }}>
                    <Button variant="outline-success" size="sm">
                        <FontAwesomeIcon icon={faEdit} size="xs" />
                    </Button>
                </Link>
                <Link to={'/view/' + data.id}>
                    <Button variant="outline-info" size="sm">
                        <FontAwesomeIcon icon={faEye} size="xs" />
                    </Button>
                </Link>
            </td>
        </tr>
    )
}

export default ShipmentSingleRow