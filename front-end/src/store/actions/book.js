import * as actionTypes from './actionTypes';

export const fetchBooksStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchBooksSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchBooksFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchBooks = () => {
    return {
        type: actionTypes.FETCH_BOOKS
    };
};