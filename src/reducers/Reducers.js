import {combineReducers} from "redux";
import shipmentReducer from './shipmentReducer';

export default combineReducers({
    shipment: shipmentReducer
})
