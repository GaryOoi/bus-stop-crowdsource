/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import produce from "immer";

const initialState = {
  isLoading: false,
  busstops: [],
  error: "",
};

const busstopReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "ADD_BUS_STOP_CURRENT_AMOUNT_REQUEST":
        draft.isLoading = true;
        break;
      case "ADD_BUS_STOP_CURRENT_AMOUNT_SUCCESS":
        const idx = draft.busstops.findIndex((x) => x.id === Number(action.id));
        draft.busstops[idx].currentAmount = action.amount;
        draft.isLoading = false;
        draft.error = "";
        break;
      case "ADD_BUS_STOP_CURRENT_AMOUNT_FAIL":
        draft.isLoading = false;
        break;
      case "GET_BUS_STOPS_REQUEST":
        draft.isLoading = true;
        break;
      case "GET_BUS_STOPS_SUCCESS":
        draft.busstops = action.busstops;
        draft.isLoading = false;
        draft.error = "";
        break;
      case "GET_BUS_STOPS_FAIL":
        draft.isLoading = false;
        draft.error = action.error;
        break;
    }
  });

export default busstopReducer;
