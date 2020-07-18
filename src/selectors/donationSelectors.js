export const getDonations = (busstopId) => (state) =>
  state.donation.donations.filter(
    (donation) => donation.busstopId === Number(busstopId)
  );

export const getDonationsLoading = (state) => state.donation.isLoading;

export const getDonationsError = (state) => state.donation.error;
