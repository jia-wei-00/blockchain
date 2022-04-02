import React from "react";
import Maintenance from "../../assets/img/img/home/comingsoon.png";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
.jumbotron.no-bg{
    height: 100vh;
    overflow: hidden;
    background-repeat: repeat;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
  }
`;
const Error = () => {
  return (
    <div >
      <GlobalStyles />
      <section
        className="jumbotron no-bg"
        style={{
          backgroundImage: `url(${Maintenance})`,
        }}
      ></section>
    </div>
  );
};

export default Error;
