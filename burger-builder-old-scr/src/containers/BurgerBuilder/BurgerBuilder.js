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

  removeIngredientHandler = type => {
    //get count and do -1

    const oldCount = this.state.ingredients[type];

    if (oldCount === 0) {
      return;
    }

    const tempIngredients = { ...this.state.ingredients };

    tempIngredients[type] = oldCount - 1;

    const tempTotalPrice = this.state.totalPrice;

    const updatedPrice = tempTotalPrice - INGREDIENT_PRICES[type];

    this.setState({ ingredients: tempIngredients, totalPrice: updatedPrice });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    //Iterate through object's keys
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //returns true or false
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
