import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import rootReducer from "./reducers";
import loggingMiddleware from "redux-logger"; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from "redux-thunk"; // https://github.com/gaearon/redux-thunk

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      // `withExtraArgument` gives us access to axios in our async action creators!
      // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
      thunkMiddleware,
      loggingMiddleware
    )
  )
);
