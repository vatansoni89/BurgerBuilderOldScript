import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.5,
  cheese: 0.6,
  meat: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = type => {
    ////Increase the count
    //get old count for that type

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    //get copy of state

    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;

    //set price

    const price = this.state.totalPrice;
    const updatedPrice = INGREDIENT_PRICES[type] + price;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
