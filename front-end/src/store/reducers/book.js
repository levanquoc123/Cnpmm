import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    books: [],
    loading: false
};

const fetchBooksStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchBooksStartSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchBooksFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_BOOKS_START: return fetchBooksStart( state, action );
        case actionTypes.FETCH_BOOKS_SUCCESS: return fetchBooksStartSuccess( state, action );
        case actionTypes.FETCH_BOOKS_FAIL: return fetchBooksFail( state, action );
        default: return state;
    }
};

export default reducer;
