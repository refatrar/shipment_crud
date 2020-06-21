import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'

class SortElement extends Component{
    constructor(props) {
        super(props);

        this.state = {
            sort: 'asc'
        }
    }

    click = () => {
        this.setState({
            sort: this.state.sort === 'asc' ? 'desc' : 'asc'
        }, () => {
            this.props.handleSort(this.props.parm, this.state.sort);
        })
    }

    render() {
        return (
            <FontAwesomeIcon onClick={this.click} className="fa-pull-right" icon={this.state.sort === 'asc' ? faSortAlphaDown : faSortAlphaUp} />
        )
    }
}

export default SortElement