/* eslint-disable no-case-declarations */
import { SET_ACCESSTOKEN } from "./index";

const tokenReducer = (accessToken = "", action) => {
  switch (action.type) {
    case SET_ACCESSTOKEN:
      return action.accessToken;
    default:
      return accessToken;
  }
};

export default tokenReducer;
