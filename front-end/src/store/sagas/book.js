import { put } from "redux-saga/effects";

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* fetchBookSaga(action) {
    yield put(actions.fetchBooksStart());
    // const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    // const queryParams = 'test'
    try {
        // const response = yield axios.get( '/orders.json' + queryParams);
        const response = yield axios.get( '/test');
        const fetchedBooks = [];
        for ( let key in response.data ) {
            fetchedBooks.push( {
                ...response.data[key],
                id: key
            } );
        }
        yield put(actions.fetchBooksSuccess(fetchedBooks));
    } catch (error) {
        yield put(actions.fetchBooksFail(error));
    }
}