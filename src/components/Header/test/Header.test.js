import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import Header from "../index";

test("renders learn react link", () => {
  const { container } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();
});
