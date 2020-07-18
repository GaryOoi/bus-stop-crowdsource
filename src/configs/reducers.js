import { combineReducers } from "redux";

import busStopReducer from "reducers/busStopReducer";
import donationReducer from "reducers/donationReducer";

const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    busStop: busStopReducer,
    donation: donationReducer,
    ...injectedReducers,
  });

  return rootReducer;
};

export default createReducer;
