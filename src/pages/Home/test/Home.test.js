import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import Home from "../index";

test("renders learn react link", () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    busstop: {
      isLoading: false,
      error: "",
      busstops: [
        {
          id: 1,
          name: "xyz",
          currentAmount: 6,
          totalAmount: 700,
        },
      ],
    },
  });

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
