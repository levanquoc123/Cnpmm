import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    phones: [],
    loading: false
};

const fetchphonesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchphonesStartSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchphonesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_phoneS_START: return fetchphonesStart( state, action );
        case actionTypes.FETCH_phoneS_SUCCESS: return fetchphonesStartSuccess( state, action );
        case actionTypes.FETCH_phoneS_FAIL: return fetchphonesFail( state, action );
        default: return state;
    }
};

export default reducer;
