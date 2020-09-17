import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { getMealService } from "../Services/itemService";
import Meal from "../Components/Meal";

class HomePage extends Component {
  state = {
    meals: [],
  };
  async componentDidMount() {
    const { data } = await getMealService();
    this.setState({ meals: [...data] });
  }

  render() {
    const { meals } = this.state;
    return (
      <>
        <section class="section-about">
          <div class="u-center-text">
            <h2 class="heading-secondary u-margin-bottom-big">
              Exciting ChopLife Collection
            </h2>
          </div>

          <div class="row container-fluid">
            {meals && meals.length < 1 && <div>Loading Meals....</div>}
            {meals &&
              meals.length &&
              meals.map((meal, idx) => <Meal mealDetail={meal} key={idx} />)}
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(HomePage);
