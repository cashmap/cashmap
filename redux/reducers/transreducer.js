/* eslint-disable no-case-declarations */
import { GET_TRANSACTIONS, GET_TRANSACTION } from "./index";

const transReducer = (transactions = [], action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    case GET_TRANSACTION:
      let allTrans = transactions.filter(
        transaction => transaction.id !== action.transaction.id
      );
      allTrans.push(action.transaction);
      return allTrans;

    default:
      return transactions;
  }
};

export default transReducer;
