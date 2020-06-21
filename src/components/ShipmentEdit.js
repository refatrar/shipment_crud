import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'

import { updateShipment } from './../actions/shipmentActions'
import {connect} from "react-redux";
import PropTypes from "prop-types";

class ShipmentEdit extends Component {
    constructor() {
        super();

        this.state = {
            fromData: null
        }


    }
    componentDidMount() {
        this.setState({
            fromData: this.props.location.state.data
        })
    }

    handleEdit = (e) => {
        e.preventDefault();
        e.persist();

        this.setState((prevState) => {
            let fromData = Object.assign({}, prevState.fromData);  // creating copy of state variable jasper
            fromData.name = this.getName.value;                     // update the name property, assign a new value
            return {
                fromData
            };
        }, async () => {
            await this.props.updateShipment(this.props.match.params.id, this.state.fromData)
            await this.props.history.goBack()
        })


    }

    render() {
        return (
            <div className="row mt-2">
                <div className="col-sm-12">
                    {
                        this.state.fromData ? (
                            <Form onSubmit={this.handleEdit}>
                                <Form.Control
                                    className="mb-2 mr-sm-2"
                                    ref={(input) => this.getId = input}
                                    defaultValue={this.state.fromData.id}
                                    placeholder="Enter Post Title"
                                ></Form.Control>
                                <Form.Control
                                    className="mb-2 mr-sm-2"
                                    as="textarea"
                                    ref={(input) => this.getName = input}
                                    defaultValue={this.state.fromData.name}
                                    placeholder="Enter Post"
                                ></Form.Control>
                                <Button className="mb-2 mr-sm-2" type="submit" variant="primary">Update</Button>
                            </Form>
                        ) : ''
                    }
                </div>
            </div>
        )
    }
}

ShipmentEdit.propTypes = {
    updateShipment: PropTypes.func.isRequired
};

export default connect(null, { updateShipment })(ShipmentEdit)