import React from "react";
import { render } from "@testing-library/react";

import Footer from "../index";

test("renders learn react link", () => {
  const { container } = render(<Footer />);

  expect(container.firstChild).toMatchSnapshot();
});
