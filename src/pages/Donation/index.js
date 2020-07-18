import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Spinner,
  Modal,
} from "react-bootstrap";

import {
  addBusstopCurrentAmountRequest,
  addBusstopCurrentAmountSuccess,
  addBusstopCurrentAmountFail,
} from "actions/busstopActions";
import {
  getDonationsRequest,
  getDonationsSuccess,
  getDonationsFail,
  addDonationRequest,
  addDonationSuccess,
  addDonationFail,
} from "actions/donationActions";
import {
  getDonations,
  getDonationsLoading,
  getDonationsError,
} from "selectors/donationSelectors";
import { getSpecificBusstop } from "selectors/busstopSelectors";

import { MONTHS, YEARS } from "globals/constant";
import MessageModal from "components/MessageModal";
import UserDonation from "components/UserDonation";
import { getData, addDonation } from "utils/request";
import { genUUIDv4 } from "utils/utils";
import {
  Section,
  SectionHeader,
  DonationBar,
  DonationDescription,
  DonationFundedAmount,
  DonationIndicator,
  StyledProgressBar,
  HistoryWrapper,
  DonationHeader,
  DonationButton,
  SpinnerWrapper,
} from "./styles";

const initialState = {
  name: "",
  email: "",
  amount: "",
};

const bankInfoInitialState = {
  cardNumber: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
};

const schema = yup.object({
  name: yup.string().required("*Required"),
  email: yup.string().email("Invalid email"),
  amount: yup
    .string()
    .matches(/^\d+(?:\.\d{0,2})$/, "Invalid amount (eg: 12.00)")
    .required("*Required"),
});

const bankInfoSchema = yup.object({
  cardNumber: yup
    .string()
    .required("*Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(16, "Invalid Card Number")
    .max(16),
  expirationMonth: yup
    .string()
    .required("*Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(2, "Invalid Month"),
  expirationYear: yup
    .string()
    .required("*Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(4, "Invalid Year"),
  cvv: yup
    .string()
    .required("*Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(3, "Invalid CVV"),
});

function Donation({ match }) {
  const busStop = useSelector(getSpecificBusstop(match.params.busstopid));
  const percentage = parseFloat(
    (busStop.currentAmount / busStop.totalAmount) * 100
  ).toFixed(2);
  const leftAmount = busStop.totalAmount - busStop.currentAmount;
  const dispatch = useDispatch();
  const donations = useSelector(getDonations(match.params.busstopid));
  const donationsLoading = useSelector(getDonationsLoading);
  const donationsError = useSelector(getDonationsError);
  const [modelData, setModelData] = useState({
    visibility: false,
    message: "",
  });

  const [dataToSubmit, setDataToSubmit] = useState({
    isBankInfoModalVisible: false,
    message: "",
    values: {},
    actions: {},
  });

  const handlePressModal = () => {
    setModelData({
      ...modelData,
      visibility: !modelData.visibility,
    });
  };

  const handleBankInfoModalCancel = () => {
    dataToSubmit.actions.setSubmitting(false);
  };

  const handleSubmit = (values, actions) => {
    setDataToSubmit({
      values,
      actions,
    });
  };

  const handleBankInfoModalSubmit = async (values) => {
    try {
      dispatch(addDonationRequest());
      dispatch(addBusstopCurrentAmountRequest());
      // Process bank card
      await addDonation({ ...values, ...dataToSubmit.values });
      // Add donation
      const editedValues = {
        id: genUUIDv4(),
        name: dataToSubmit.values.name,
        email: dataToSubmit.values.email,
        amount: dataToSubmit.values.amount,
        busstopId: Number(match.params.busstopid),
        createdAt: new Date(),
      };
      const total =
        Number(dataToSubmit.values.amount) + Number(busStop.currentAmount);
      dispatch(addDonationSuccess(editedValues));
      dispatch(addBusstopCurrentAmountSuccess(match.params.busstopid, total));
    } catch (error) {
      dispatch(addDonationFail());
      dispatch(addBusstopCurrentAmountFail());
      setModelData({
        visibility: true,
        message: error,
      });
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        dispatch(getDonationsRequest());
        const result = await getData("donations");

        dispatch(getDonationsSuccess(result));
      } catch (err) {
        dispatch(getDonationsFail(err));
        setModelData({
          visibility: true,
          message: err,
        });
      }
    };
    if (donations.length < 1) {
      fetchAPI();
    }
  }, [donations.length, dispatch]);

  return (
    <>
      <Section>
        {donationsLoading || donationsError !== "" ? (
          <SpinnerWrapper>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </SpinnerWrapper>
        ) : (
          <Container>
            <SectionHeader className="mb-5">{busStop.name}</SectionHeader>
            <Row>
              <Col lg={7}>
                <div className="mb-4">
                  <DonationBar className="mb-3" />
                  <DonationFundedAmount>
                    ${busStop.currentAmount}
                  </DonationFundedAmount>
                  <DonationIndicator className="mb-2">
                    pledged of ${busStop.totalAmount} goal
                  </DonationIndicator>
                  <StyledProgressBar
                    now={percentage}
                    label={`${percentage}%`}
                  />
                </div>
                <Row>
                  <Col>
                    <DonationDescription>
                      ${leftAmount > 0 ? leftAmount : 0}
                    </DonationDescription>
                    <DonationIndicator>More to go</DonationIndicator>
                  </Col>
                  <Col>
                    <div className="mb-5">
                      <DonationDescription>
                        {donations.length}
                      </DonationDescription>
                      <DonationIndicator>Backers</DonationIndicator>
                    </div>
                  </Col>
                </Row>

                <h4 className="mb-4">History</h4>
                <HistoryWrapper>
                  {donations.map((donation) => {
                    return (
                      <UserDonation key={donation.id} donation={donation} />
                    );
                  })}
                </HistoryWrapper>
              </Col>
              <Col lg={5}>
                <Card>
                  <Card.Body>
                    <DonationHeader className="font-weight-bold mb-4">
                      Fund this bus stop
                    </DonationHeader>
                    <Formik
                      validationSchema={schema}
                      onSubmit={handleSubmit}
                      initialValues={initialState}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Form.Group>
                            <Form.Label>Name*</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              isInvalid={touched.name && !!errors.name}
                              placeholder="Enter your name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={touched.email && !!errors.email}
                              placeholder="Enter your email"
                            />
                            <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            className="mb-5"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Fund Amount*</Form.Label>
                            <Form.Control
                              type="string"
                              name="amount"
                              value={values.amount}
                              onChange={handleChange}
                              isInvalid={touched.amount && !!errors.amount}
                              placeholder="Enter amount"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.amount}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <DonationButton type="submit" size="lg" block>
                            Fund Now
                          </DonationButton>
                          <Modal
                            show={isSubmitting}
                            onHide={handleBankInfoModalCancel}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Bank Account Information
                              </Modal.Title>
                            </Modal.Header>
                            <Formik
                              validationSchema={bankInfoSchema}
                              onSubmit={handleBankInfoModalSubmit}
                              initialValues={bankInfoInitialState}
                            >
                              {({
                                handleSubmit,
                                handleChange,
                                values,
                                errors,
                                touched,
                              }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                  <Modal.Body>
                                    <Form.Group>
                                      <Form.Label>Card Number*</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="cardNumber"
                                        value={values.cardNumber}
                                        onChange={handleChange}
                                        isInvalid={
                                          touched.cardNumber &&
                                          !!errors.cardNumber
                                        }
                                        placeholder="1234 4568 9101 1121"
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {errors.cardNumber}
                                      </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Row>
                                      <Form.Group
                                        as={Col}
                                        controlId="formGridCity"
                                      >
                                        <Form.Label>
                                          Expiration Date*
                                        </Form.Label>
                                        <Form.Control
                                          as="select"
                                          name="expirationMonth"
                                          value={values.expirationMonth}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.expirationMonth &&
                                            !!errors.expirationMonth
                                          }
                                        >
                                          <option value="">Month</option>
                                          {MONTHS.map((month) => {
                                            return (
                                              <option key={month} value={month}>
                                                {month}
                                              </option>
                                            );
                                          })}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.expirationMonth}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group
                                        as={Col}
                                        controlId="formGridState"
                                      >
                                        <Form.Label>&nbsp; </Form.Label>
                                        <Form.Control
                                          as="select"
                                          name="expirationYear"
                                          value={values.expirationYear}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.expirationYear &&
                                            !!errors.expirationYear
                                          }
                                        >
                                          <option value="">Year</option>
                                          {YEARS.map((year) => {
                                            return (
                                              <option key={year} value={year}>
                                                {year}
                                              </option>
                                            );
                                          })}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                          {errors.expirationYear}
                                        </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group
                                        className="mb-5"
                                        as={Col}
                                        controlId="formGridZip"
                                      >
                                        <Form.Label>CVV*</Form.Label>
                                        <Form.Control
                                          name="cvv"
                                          value={values.cvv}
                                          onChange={handleChange}
                                          isInvalid={
                                            touched.cvv && !!errors.cvv
                                          }
                                          placeholder="123"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {errors.cvv}
                                        </Form.Control.Feedback>
                                      </Form.Group>
                                    </Form.Row>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <DonationButton type="submit">
                                      Submit
                                    </DonationButton>
                                  </Modal.Footer>
                                </Form>
                              )}
                            </Formik>
                          </Modal>
                        </Form>
                      )}
                    </Formik>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </Section>
      <MessageModal modelData={modelData} onClick={handlePressModal} />
    </>
  );
}

Donation.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Donation;
