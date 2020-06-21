import React, { Component } from "react"
import { connect } from  'react-redux'
import { Card, Button, Table, ListGroup } from 'react-bootstrap'
import PropTypes from "prop-types";

import { fetchSingleShipment } from '../actions/shipmentActions';
import CargoSingleRow from './tables/CargoSingleRow'

class ShipmentView extends Component{
    constructor() {
        super();

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.props.fetchSingleShipment(this.props.match.params.id)
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        const data = this.props.shipement

        return (
            <div className="row mt-2">
                <div className="col-12">
                    {
                        data ? (<Card>
                                <Card.Header>
                                    <h4>{ `${data.name} (${data.id})` }</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title><strong>Description:</strong> { data.destination }</Card.Title>
                                    <Table bordered size="sm">
                                        <tbody>
                                            <tr>
                                                <td><strong>Mode:</strong> { data.mode }</td>
                                                <td><strong>Type:</strong> { data.type }</td>
                                                <td><strong>Origin:</strong> { data.origin }</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total:</strong> { data.total }</td>
                                                <td><strong>Status:</strong> { data.status }</td>
                                                <td><strong>UserID:</strong> { data.userId }</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <h6><strong>Cargo Info</strong></h6>
                                            <Table bordered size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th>Description</th>
                                                        <th>Volume</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { data.cargo.map((item, key) => <CargoSingleRow data={item} key={key} />) }
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className="col-md-3">
                                            <h6><strong>services</strong></h6>
                                            <ListGroup>
                                                { data.services.map((item, key) => <ListGroup.Item key={key}>{ item.type }</ListGroup.Item>)}
                                            </ListGroup>
                                        </div>
                                    </div>
                                    <Button className="mt-2" variant="primary" onClick={this.goBack}>Go Back</Button>
                                </Card.Body>
                            </Card>) : ''
                    }
                </div>
            </div>
        )
    }
}

ShipmentView.propTypes = {
    fetchSingleShipment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    shipement: state.shipment.viewShipment,
})

export default connect(mapStateToProps, {fetchSingleShipment})(ShipmentView)