import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BusCard from "../index";

test("Test BusCard component", () => {
  const BusstopInfo = {
    id: "1",
    name: "a",
    currentAmount: "100",
    totalAmount: "700",
  };
  const { getByText } = render(<BusCard busstop={BusstopInfo} />);
  expect(getByText("a")).toBeTruthy();
  expect(
    getByText(
      parseFloat(
        (BusstopInfo.currentAmount / BusstopInfo.totalAmount) * 100
      ).toFixed(2) + "% funded"
    )
  ).toBeTruthy();
  expect(getByText("Funding Target: $700")).toBeTruthy();
});
