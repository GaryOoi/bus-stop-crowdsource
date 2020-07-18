import { createStore } from "redux";

import { loadState, saveState } from "utils/localStorage";
import createReducer from "./reducers";

const configureStore = (initialState = {}, history) => {
  const persistedState = loadState();
  // const store = createStore(createReducer(), initialState);
  const store = createStore(createReducer(), persistedState);

  store.injectedReducers = {}; // Reducer registry

  store.subscribe(() => {
    saveState({
      ...store.getState(),
    });
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
};

export default configureStore;
