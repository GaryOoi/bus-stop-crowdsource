/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import produce from "immer";

// import { SYNC_USER, SYNC_CONFIG, ACTION_SET_SYNC_STORE } from './constants';

const initialState = {
  isLoading: false,
  donations: [],
  error: "",
};

const donationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case "GET_DONATIONS_REQUEST":
        draft.isLoading = true;
        break;
      case "GET_DONATIONS_SUCCESS":
        draft.donations = action.donations;
        draft.isLoading = false;
        draft.error = "";
        break;
      case "GET_DONATIONS_FAIL":
        draft.isLoading = false;
        draft.error = action.error;
        break;
      case "ADD_DONATION_REQUEST":
        draft.isLoading = true;
        break;
      case "ADD_DONATION_SUCCESS":
        draft.donations.unshift(action.donation);
        draft.isLoading = false;
        draft.error = "";
        break;
      case "ADD_DONATION_FAIL":
        draft.isLoading = false;
        break;
    }
  });

export default donationReducer;
