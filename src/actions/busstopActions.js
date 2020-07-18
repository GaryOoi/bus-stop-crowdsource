export const addBusstopCurrentAmountRequest = () => ({
  type: "ADD_BUS_STOP_CURRENT_AMOUNT_REQUEST",
});

export const addBusstopCurrentAmountSuccess = (id, amount) => ({
  type: "ADD_BUS_STOP_CURRENT_AMOUNT_SUCCESS",
  id,
  amount,
});

export const addBusstopCurrentAmountFail = () => ({
  type: "ADD_BUS_STOP_CURRENT_AMOUNT_FAIL",
});

export const getBusstopsRequest = () => ({
  type: "GET_BUS_STOPS_REQUEST",
});

export const getBusstopsSuccess = (busstops) => ({
  type: "GET_BUS_STOPS_SUCCESS",
  busstops,
});

export const getBusstopsFail = (error) => ({
  type: "GET_BUS_STOPS_FAIL",
  error,
});
