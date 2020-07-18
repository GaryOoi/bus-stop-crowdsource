import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import MessageModal from "../index";

test("Test Message Modal component", () => {
  const modalData = {
    visibility: true,
    message: "hello",
  };
  const mockFn = jest.fn();
  const { getByText } = render(
    <MessageModal modelData={modalData} onClick={mockFn} />
  );

  expect(getByText("hello")).toBeTruthy();
  fireEvent.click(getByText("Noted"));
  expect(mockFn).toHaveBeenCalled();
});
