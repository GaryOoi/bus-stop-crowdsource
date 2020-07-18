import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavHeader = styled.h1`
  color: #fff;
  line-height: 1.5;
  font-size: 24px;
  font-weight: 800;
`;

export const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;
