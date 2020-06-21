import Axios from "axios";

import toastr from "toastr";
import "toastr/build/toastr.min.css"

export const countShipmentData = (filter) => async dispatch => {
    await Axios.get(process.env.REACT_APP_API_ENDPOINT, {params: filter}).then(async res => {
        dispatch({type: 'COUNT_ALL_SHIPMENT', payload: await res.data.length});
    })
}

export const fetchShipmentData = (params) => async dispatch => {
    await Axios.get(process.env.REACT_APP_API_ENDPOINT, {params: params}).then(async res => {
        dispatch({type: 'FETCH_SHIPMENTS', payload: await res.data});
    })
}

export const fetchSingleShipment = (id) => async dispatch => {
    await Axios.get(process.env.REACT_APP_API_ENDPOINT + `/${id}`).then(async res => {
        dispatch({type: 'VIEW_SHIPMENT', payload: await res.data})
    })
}

export const updateShipment = (id, data) => async dispatch => {
    await Axios.put(process.env.REACT_APP_API_ENDPOINT + `/${id}`, data).then(async res => {
        const data = await res
        if (data.status === 200){
            toastr.success("Data Updated");
        }
    })
}