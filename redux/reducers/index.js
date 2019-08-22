// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the line below!
import firebase from "firebase";
import { combineReducers } from "redux";
import transReducer from "./transreducer";
import tokenReducer from "./tokenreducer";

// ACTION TYPES
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const GET_TRANSACTION = "GET_TRANSACTION";
export const SET_ACCESSTOKEN = "SET_ACCESSTOKEN";

// ACTION CREATORS
export const gotTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
});

export const setAccessToken = token => ({
  type: SET_ACCESSTOKEN,
  token
});

// export const gotTransaction = transaction => ({
//   type: GET_TRANSACTION,
//   transaction
// });

// THUNKS

export const getTransactions = data => {
  return async function(dispatch, getState) {
    const result = await firebase.functions().httpsCallable("exchange")({
      public_token: data.metadata.public_token
    });
    //
    const { data: getTransResult } = await firebase
      .functions()
      .httpsCallable("getTrans")({
      access_token: result.data.access_token
    });
    dispatch(gotTransactions({ data: getTransResult }));
  };
};

export const setAccessTokens = token => {
  return async function(dispatch, getState) {
    dispatch(setAccessToken(token));
  };
};

// export const getTransaction = id => {
//   return async function(dispatch, getState) {
//     const { data } = await axios.get(`/api/campuses/${id}`);
//     dispatch(gotTransaction(data));
//   };
// };

// REDUCERS

const rootReducer = combineReducers({
  transactions: transReducer,
  accessToken: tokenReducer
});

export default rootReducer;
