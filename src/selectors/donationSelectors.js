export const getDonations = (busStopId) => (state) =>
  state.donation.donations.filter(
    (donation) => donation.busStopId === Number(busStopId)
  );

export const getDonationsLoading = (state) => state.donation.isLoading;

export const getDonationsError = (state) => state.donation.error;
