export const getBusStops = (state) => state.busStop.busStops;

export const getBusStopsLoading = (state) => state.busStop.isLoading;

export const getBusStopsError = (state) => state.busStop.error;

export const getSpecificBusStop = (id) => (state) =>
  state.busStop.busStops.find((busStop) => busStop.id === Number(id));
