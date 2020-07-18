import styled from "styled-components";
import { ProgressBar, Image, Button } from "react-bootstrap";

export const Section = styled.div`
  padding: 3em 0;
  position: relative;
  @media (max-width: 767.98px) {
    padding-top: 4em;
  }
`;

export const SectionHeader = styled.h2`
  font-size: 30px;
  font-weight: 800;
`;

export const DonationBar = styled.div`
  height: 8px;
  width: 10%;
  background-color: #009e74;
`;

export const DonationDescription = styled.h3`
  font-size: 28px;
`;

export const DonationFundedAmount = styled(DonationDescription)`
  color: #009e74;
`;

export const DonationIndicator = styled.div`
  font-size: 14px;
`;

export const StyledProgressBar = styled(ProgressBar)`
  .progress-bar {
    background-color: unset;
    background: linear-gradient(210deg, #5de455 0%, #14c0aa 100%) !important;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledImg = styled(Image)`
  width: 40px;
`;

export const UserDescription = styled.div`
  color: #757575;
`;

export const HistoryWrapper = styled.div`
  overflow-y: scroll;
  height: 400px;
`;

export const DonationHeader = styled.h4`
  color: #009e74;
`;

export const DonationButton = styled(Button)`
  background-color: #009e74;
  color: #fff;
  font-weight: 700;
  border: 0;

  &:hover,
  &:active {
    background-color: #037362;
    color: #fff;
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
