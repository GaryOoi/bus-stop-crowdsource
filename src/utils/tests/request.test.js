import { getData, addDonation } from "../request";

test("test addDonation function", async () => {
  const bankInfo = {
    cardNumber: "1234567891011121", //12 numbers
    expirationMonth: "05", // month (01,02,etc) **must not before current month and year
    expirationYear: "2022", //year (2020,2021,etc)
    cvv: "123", //three numbers
    name: "yang",
    email: "adm@xyz.com",
    amount: "17.00",
  };
  let allCorrect = true;
  try {
    await addDonation(bankInfo);
  } catch (err) {
    allCorrect = false;
  }

  expect(allCorrect).toBe(true);
});

test("Test getData function", async () => {
  const objecyKey = "lala"; // busstops or donations
  let allCorrect = true;
  try {
    await getData(objecyKey);
  } catch (err) {
    allCorrect = false;
  }
  expect(allCorrect).toBe(false);
});
