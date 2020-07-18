import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserDonation from "../index";

test("Test UserDonation component", () => {
  const donationInfo = {
    name: "a",
    amount: "100",
    createdAt: new Date(),
  };

  const { getByText } = render(<UserDonation donation={donationInfo} />);
  expect(getByText(donationInfo.name)).toBeTruthy();
  expect(getByText(donationInfo.amount)).toBeTruthy();
  expect(getByText(donationInfo.createdAt)).toBeTruthy();
});
