const states = {
    shipmentData: [],
    viewShipment: '',
    countShipment: 0
}

export default (state = states, action) => {
    switch (action.type) {
        case 'COUNT_ALL_SHIPMENT':
            return {...state, countShipment: action.payload}
        case 'FETCH_SHIPMENTS':
            return {...state, shipmentData: action.payload}
        case 'VIEW_SHIPMENT':
            return {...state, viewShipment: action.payload}
        default:
            return state
    }
}