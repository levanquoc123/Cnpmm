import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";

import Routes from "../src/Routes";
import * as serviceWorker from "./registerServiceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';

// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import burgerBuilderReducer from './store/reducers/burgerBuilder';
// import orderReducer from './store/reducers/order';
// import authReducer from './store/reducers/auth';
// import bookReducer from './store/reducers/book';
// import { watchAuth, watchBurgerBuilder, watchOrder, watchBook } from './store/sagas';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// const rootReducer = combineReducers({
//     burgerBuilder: burgerBuilderReducer,
//     order: orderReducer,
//     auth: authReducer,
//     book: bookReducer
// });

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunk, sagaMiddleware)
// ));

// sagaMiddleware.run(watchAuth);
// sagaMiddleware.run(watchBurgerBuilder);
// sagaMiddleware.run(watchOrder);
// sagaMiddleware.run(watchBook);

// const app = (
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>
// );

// ReactDOM.render( app, document.getElementById( 'root' ) );
// registerServiceWorker();
