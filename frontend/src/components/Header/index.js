import React from "react";

import { HeaderContainer, Logo } from "./styles";
import Icon from "../../assets/search.jpg";

function Header(props) {
  return (
    <>
      <HeaderContainer>
        <Logo src={Icon} alt="Encurtador de URL" />
        <h1>Encurtador</h1>
        <p>{props.children}</p>
      </HeaderContainer>
    </>
  );
}

export default Header;
