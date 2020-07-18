import styled from "styled-components";
import { Button, Card } from "react-bootstrap";

export const CardBody = styled(Card.Body)`
  justify-content: space-between;
`;

export const CardDonationDescription = styled.div`
  color: #212121;
  font-size: 14px;
  line-height: 1.5;
`;

export const CardDonationPercentage = styled.div`
  color: #037362;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
`;

export const DonateButton = styled(Button)`
  background-color: #e0f2f1;
  color: #009688;
  font-weight: 700;
  border: 0;

  &:hover {
    background-color: #009e74;
    color: #fff;
  }
`;
