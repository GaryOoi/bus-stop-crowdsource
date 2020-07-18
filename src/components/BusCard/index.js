import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

import {
  CardBody,
  CardDonationDescription,
  CardDonationPercentage,
  DonateButton,
} from "./styles";

function BusCard({ busstop: { id, name, currentAmount, totalAmount } }) {
  const history = useHistory();

  const handlePressDonate = () => {
    history.push(`/donation/${id}`);
  };

  return (
    <Card className="mb-4">
      <CardBody className="d-flex align-items-center">
        <div>
          <h5 className="mb-3">{name}</h5>
          <CardDonationDescription>
            Funding Target: ${totalAmount}
          </CardDonationDescription>
          <CardDonationPercentage>
            {parseFloat((currentAmount / totalAmount) * 100).toFixed(2)}% funded
          </CardDonationPercentage>
        </div>
        <DonateButton onClick={handlePressDonate}>Donate Now</DonateButton>
      </CardBody>
    </Card>
  );
}

BusCard.propTypes = {
  busstop: PropTypes.object.isRequired,
};

export default BusCard;
