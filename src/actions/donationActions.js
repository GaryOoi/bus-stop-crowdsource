export const getDonationsRequest = () => ({
  type: "GET_DONATIONS_REQUEST",
});

export const getDonationsSuccess = (donations) => ({
  type: "GET_DONATIONS_SUCCESS",
  donations,
});

export const getDonationsFail = (error) => ({
  type: "GET_DONATIONS_FAIL",
  error,
});

export const addDonationRequest = () => ({
  type: "ADD_DONATION_REQUEST",
});

export const addDonationSuccess = (donation) => ({
  type: "ADD_DONATION_SUCCESS",
  donation,
});

export const addDonationFail = () => ({
  type: "ADD_DONATION_FAIL",
});
