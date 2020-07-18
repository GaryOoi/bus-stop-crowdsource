import * as yup from "yup";

import data from "data.json";

const bankInfoSchema = yup.object({
  cardNumber: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(16, "Invalid Card Number")
    .max(16),
  expirationMonth: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(2, "Invalid Month"),
  expirationYear: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(4, "Invalid Year"),
  cvv: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(3, "Invalid CVV"),
  name: yup.string().required("*Required"),
  email: yup.string().email("Invalid email"),
  amount: yup
    .string()
    .matches(/^\d+(?:\.\d{0,2})$/, "Invalid amount (eg: 12.00)")
    .required("*Required"),
});

/**
 * get data from json file function.
 *
 * @param {string} objectKey  Object key (busstops or donations)
 *
 * @returns {object}
 */
export const getData = (objectKey) => {
  if (data[objectKey] === undefined) {
    return Promise.reject("No data found");
  }
  return Promise.resolve(data[objectKey]);
};

/**
 * add donation.
 *
 * @param {object} bankInfo   {cardNumber,expirationMonth,expirationYear,cvv,name,email,amount}
 *
 * @returns {boolean} (true)
 */
export const addDonation = async (bankInfo) => {
  try {
    await bankInfoSchema.validate(bankInfo);
    const expirationDate = new Date(
      bankInfo.expirationYear + "-" + bankInfo.expirationMonth
    );
    if (expirationDate < new Date()) {
      throw new Error(
        "Cannot proceed to payment. Please check your card information."
      );
    }
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(
      "Cannot proceed to payment. Please check your card information."
    );
  }
};
