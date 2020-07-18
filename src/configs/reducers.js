import { combineReducers } from "redux";

import busstopReducer from "reducers/busstopReducer";
import donationReducer from "reducers/donationReducer";

const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    busstop: busstopReducer,
    donation: donationReducer,
    ...injectedReducers,
  });

  return rootReducer;
};

export default createReducer;
