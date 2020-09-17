import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import Breakfast from "../images/Breakfast.jpg";

const PageLayout = (props) => {
  const style = {
    backgroundImage: `url(${Breakfast});`,
  };
  return (
    <div>
      <header class="header">
        <div class="header__logo-box">
          <h3>ChopLife</h3>
        </div>
        <div class="header__text-box">
          <h1 class="heading-primary">
            <span class="heading-primary--main">ChopLife</span>
            <span class="heading-primary--sub">
              Chop life and stay healthly
            </span>
          </h1>
        </div>
      </header>

      <main>{props.children}</main>
    </div>
  );
};

export default PageLayout;
