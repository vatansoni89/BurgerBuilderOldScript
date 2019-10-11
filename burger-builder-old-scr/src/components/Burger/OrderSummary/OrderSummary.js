import React from "react";
import Aux from "../../../hoc/Auxiliary";
const orderSummary = props => {
  const ingredientSummary = props.ingredients;

  const ulItems = Object.keys(ingredientSummary).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {ingredientSummary[key]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>U hv Burger with Ingredients</p>
      <ul>{ulItems}</ul>
      <p>Continue to checkout!!!</p>
    </Aux>
  );
};

export default orderSummary;
