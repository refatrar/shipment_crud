import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./history";
import AllShipments from "./../components/AllShipments";
import ShipmentView from "./../components/ShipmentView"
import ShipmentEdit from "./../components/ShipmentEdit"

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" render={(props) => <AllShipments {...props} />}/>

                    <Route exact path="/view/:id" render={(props) => <ShipmentView {...props} />}/>
                    <Route exact path="/edit/:id" render={(props) => <ShipmentEdit {...props} />}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes