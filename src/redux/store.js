import {logger} from "redux-logger/src";
import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";

const middleWares = [logger,thunk]
const combinedMiddleWares = compose(applyMiddleware(...middleWares))

const store = createStore()
