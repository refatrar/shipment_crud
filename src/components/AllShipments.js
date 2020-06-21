import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from  'react-redux'
import { Table, Form } from 'react-bootstrap'
import Pagination from "react-js-pagination";

import { fetchShipmentData, countShipmentData } from "../actions/shipmentActions";
import ShipmentSingleRow from "./tables/ShipmentSingleRow";
import SortData from "./tables/SortElement";
import history from './../config/history'

class AllShipments extends Component{
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            limit: Number(process.env.REACT_APP_LIMIT),
            sort: '',
            order: '',
            shipment_id: '',
            filterObj: {
                id: '',
                status: '',
                userId: ''
            }
        }

        this.handleSort = this.handleSort.bind(this)
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);

        this.setState({
            activePage: Number(query.get('page'))
        }, () => this.fetchData())
    }

    fetchData() {
        const params = {
            _page: this.state.activePage,
            _limit: this.state.limit,
            _sort: this.state.sort,
            _order: this.state.order,
        }

        const filters = {}

        if(this.state.filterObj.id) params['id_like'] = filters['id_like'] = this.state.filterObj.id
        if(this.state.filterObj.status) params['status_like'] = filters['status_like'] = this.state.filterObj.status
        if(this.state.filterObj.userId) params['userId_like'] = filters['userId_like'] = this.state.filterObj.userId

        this.props.fetchShipmentData(params)
        this.props.countShipmentData(filters)
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber,
        }, () => {
            history.push(`/?page=${pageNumber}`)
            this.fetchData()
        });
    }

    handleSort(sort, order){
        this.setState({
            sort: sort,
            order:order
        }, () => this.fetchData())
    }

    handleFilter(event){
        event.persist();

        this.setState((prevState) => {
            let filterObj = Object.assign({}, prevState.filterObj);  // creating copy of state variable jasper
            filterObj[event.target.name] = event.target.value;                     // update the name property, assign a new value
            return {
                activePage: 1,
                sort: '',
                order: '',
                filterObj
            };

        }, () => this.fetchData())
    }

    render() {
        return (
            <div className="row mt-2">
                <div className="col-12">
                    <Form inline>
                        <Form.Control
                            name="id"
                            className="mb-2 mr-sm-2"
                            id="shipmentId"
                            placeholder="type shipment id"
                            value={this.state.filterObj.shipment_id}
                            onChange={this.handleFilter.bind(this)}
                        />
                        <Form.Control
                            name="userId"
                            className="mb-2 mr-sm-2"
                            id="userId"
                            placeholder="type user id"
                            value={this.state.filterObj.userId}
                            onChange={this.handleFilter.bind(this)}
                        />
                        <Form.Control
                            name="status"
                            className="mb-2 mr-sm-2"
                            as="select"
                            value={this.state.filterObj.status}
                            onChange={this.handleFilter.bind(this)}
                        >
                            <option value="">Select One</option>
                            <option>NEW</option>
                            <option>ACTIVE</option>
                            <option>COMPLETED</option>
                        </Form.Control>
                    </Form>
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th ># <SortData parm="id" handleSort={this.handleSort} state={this.state} /></th>
                            <th>Name <SortData parm="name" handleSort={this.handleSort} state={this.state} /></th>
                            <th>mode</th>
                            <th>Type</th>
                            <th>Destination</th>
                            <th>Origin</th>
                            <th>Total</th>
                            <th>Status <SortData parm="status" handleSort={this.handleSort} state={this.state} /></th>
                            <th>UserID <SortData parm="userId" handleSort={this.handleSort} state={this.state} /></th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.shipements.map((list, index) => <ShipmentSingleRow data={list} key={list.id} />)
                        }
                        </tbody>
                    </Table>

                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.limit}
                        totalItemsCount={this.props.totalShipment}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

AllShipments.propTypes = {
    fetchShipmentData: PropTypes.func.isRequired,
    countShipmentData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    shipements: state.shipment.shipmentData,
    totalShipment: state.shipment.countShipment
})

export default connect(mapStateToProps, {fetchShipmentData, countShipmentData})(AllShipments)