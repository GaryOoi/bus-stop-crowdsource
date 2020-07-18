import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import userImg from "assets/images/user.svg";
import { UserWrapper, StyledImg, UserDescription } from "./styles";

function UserDonation({ donation: { name, amount, createdAt } }) {
  let formattedCreatedAt = moment(createdAt).format("MMMM DD, YYYY");

  return (
    <UserWrapper className="mb-4">
      <StyledImg className="mr-3" src={userImg} rounded />
      <UserDescription>
        <strong>{name}</strong> donated ${amount} on {formattedCreatedAt}
      </UserDescription>
    </UserWrapper>
  );
}

UserDonation.propTypes = {
  donation: PropTypes.object.isRequired,
};

export default UserDonation;
