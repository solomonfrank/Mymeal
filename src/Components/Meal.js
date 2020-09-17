import React from "react";
import { Link } from "react-router-dom";
import BreakFast from "../images/Breakfast.jpg";

const Meal = ({ mealDetail: { Description, Name, Image, id } }) => {
  const firstImage = Image[0];

  const image = firstImage.name;

  return (
    <div class="col-md-3 meal-wrap">
      <div class="card">
        <figure class="card__image">
          <img
            src={`../Asset/Images/${image}`}
            class="image__item"
            alt="meal image"
          />
        </figure>
        <div class="text__wrap">
          <h3 class="item-description">{Name}</h3>
          <p class=" paragraph">{Description}</p>
          <Link to={`/meal/${id}`} class="btn-text">
            View Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Meal;
