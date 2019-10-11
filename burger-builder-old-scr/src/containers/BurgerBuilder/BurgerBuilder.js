import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    totalPrice: 4,
    purchaseable: false
  };

  updatePurchaseStateMaxMil = ingredients => {
    const tempIngredient = { ...ingredients };

    const sum = Object.keys(tempIngredient)
      .map(key => tempIngredient[key])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  updatePurchaseState = ingredients => {
    const tempIngredients = { ...ingredients };

    for (const key in tempIngredients) {
      if (tempIngredients[key] > 0) {
        this.setState({ purchaseable: true });
        return;
      }
    }
    this.setState({ purchaseable: false });
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
    this.updatePurchaseStateMaxMil(updatedIngredients);
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

    this.updatePurchaseStateMaxMil(tempIngredients);
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };

    //Iterate through object's keys
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //returns true or false
    }

    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
