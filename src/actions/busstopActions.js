export const addBusStopCurrentAmountRequest = () => ({
  type: "ADD_BUS_STOP_CURRENT_AMOUNT_REQUEST",
});

export const addBusStopCurrentAmountSuccess = (id, amount) => ({
  type: "ADD_BUS_STOP_CURRENT_AMOUNT_SUCCESS",
  id,
  amount,
});

export const addBusStopCurrentAmountFail = () => ({
  type: "ADD_BUS_STOP_CURRENT_AMOUNT_FAIL",
});

export const getBusStopsRequest = () => ({
  type: "GET_BUS_STOPS_REQUEST",
});

export const getBusStopsSuccess = (busStops) => ({
  type: "GET_BUS_STOPS_SUCCESS",
  busStops,
});

export const getBusStopsFail = (error) => ({
  type: "GET_BUS_STOPS_FAIL",
  error,
});
