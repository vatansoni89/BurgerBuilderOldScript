import Aux from "../../hoc/Auxiliary";
import React from "react";

const layout = props => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <div>{props.children}</div>
  </Aux>
);

export default layout;
