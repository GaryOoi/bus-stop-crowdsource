import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import Donation from "../index";

test("Test donation page", () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    busStop: {
      busStops: [
        {
          id: 1,
          name: "xyz",
          currentAmount: 6,
          totalAmount: 700,
        },
      ],
    },
    donation: {
      isLoading: false,
      error: "",
      donations: [
        {
          id: 1,
          name: "ali",
          email: "ali@yahoo.com",
          amount: 50,
          busStopId: 1,
          createdAt: "2020-07-12T14:55:31.173+00:00",
        },
      ],
    },
  });

  const match = {
    params: { busstopid: "1" },
  };

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Donation match={match} />
      </MemoryRouter>
    </Provider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
