export const getBusstops = (state) => state.busstop.busstops;

export const getBusstopsLoading = (state) => state.busstop.isLoading;

export const getBusstopsError = (state) => state.busstop.error;

export const getSpecificBusstop = (id) => (state) =>
  state.busstop.busstops.find((busstop) => busstop.id === Number(id));
