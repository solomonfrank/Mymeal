import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import BreakFast from "../images/Breakfast.jpg";
import { getMealByIdService } from "../Services/itemService";
import Meal from "../Components/Meal";
import ItemList from "../Components/Item";
import SweetAlert from "react-bootstrap-sweetalert";

class MealDetailPage extends Component {
  state = {
    items: [],
    carts: [],
    totalPrice: 0,
    showAlert: false,
  };

  addItem = (id) => {
    const item = this.state.items.find((x) => x.id == id);
    const itemName = item.Name;
    const newCart = this.addMultipleItem(this.state, item);
    const totalPrice = newCart.reduce(
      (sum, currItem) => sum + currItem.quantity * currItem.Price,
      0
    );
    this.setState({ carts: newCart, totalPrice }, () =>
      console.log(this.state)
    );
  };

  removeSingleItem = (state, item) => {
    const foundItem = state.carts.find((cart) => cart.id === item.id);
    console.log("last", foundItem);
    if (foundItem && foundItem.quantity === 1) {
      return state.carts.filter((cartItem) => cartItem.id !== item.id);
    }

    return state.carts.map((cartItem) =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity ? cartItem.quantity - 1 : 0,
          }
        : cartItem
    );
  };

  removeItem = (id) => {
    const item = this.state.items.find((x) => x.id == id);
    const newCart = this.removeSingleItem(this.state, item);
    const totalPrice = newCart.reduce(
      (sum, currItem) => sum + currItem.quantity * currItem.Price,
      0
    );
    this.setState({ carts: newCart, totalPrice }, () =>
      console.log(this.state)
    );
  };

  redirectToHome = () => {
    this.props.history.push("/");
  };
  addMultipleItem = (state, item) => {
    const foundItem = state.carts.find((cart) => cart.id === item.id);

    if (foundItem) {
      return state.carts.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            total: item.Price * (cartItem.quantity + 1),
          };
        } else {
          return cartItem;
        }
      });
    }
    return [...state.carts, { ...item, quantity: 1, total: item.Price }];
  };
  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    console.log(this.props.match.params.id);
    const { data } = await getMealByIdService(id);
    console.log(data);
    this.setState({ items: [...data.items], meal: data });
  }

  payWithPayStack = () => {
    console.log(process.env.REACT_APP_PAYSTACK_PUB_KEY);
    var handler = window.PaystackPop.setup({
      key: "pk_test_f348e02ffbb8417deed6f704c0d7ecd09a711b1e",
      email: "customer@email.com",
      amount: this.state.totalPrice * 100,
      currency: "NGN",
      channels: ["card"],
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678",
          },
        ],
      },
      callback: (response) => {
        console.log("res", response);
        this.setState({ showAlert: true });
        // alert("success. transaction ref is " + response.reference);
      },
      onClose: () => {
        this.setState({ showAlert: true });
      },
    });
    handler.openIframe();
  };

  render() {
    return (
      <>
        <div class="container-fluid">
          <div class="u-center-text">
            <h2 class="heading-secondary u-margin-bottom-big">
              {this.state.meal
                ? this.state.meal.Name + " " + "collection"
                : "Loading..."}
            </h2>
          </div>

          <section class="meal-table">
            {this.state.showAlert && (
              <SweetAlert
                custom
                success
                title="Congratulations"
                //	showCancel
                confirmBtnText="Ok"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="default"
                onConfirm={() => {
                  this.redirectToHome();
                }}
              >
                Order success book
              </SweetAlert>
            )}
            <table class="table">
              <tr>
                <th>Name</th>
                <th>Price(per unit)</th>
                <th>Available</th>
                <th>Count</th>
                <th>TotalPrice</th>
              </tr>
              {this.state.items && this.state.items < 1 && <div>Loading</div>}
              {this.state.items &&
                this.state.items &&
                this.state.items.map((item, idx) => (
                  <ItemList
                    itemProps={item}
                    key={idx}
                    allState={this.state}
                    removeItem={this.removeItem}
                    addItem={this.addItem}
                  />
                ))}
            </table>

            <div class="text-center">
              <h3>Total: ₦{this.state.totalPrice}</h3>

              <Link
                to="#"
                class="btn-text"
                onClick={() => this.payWithPayStack()}
              >
                Checkout
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default MealDetailPage;
