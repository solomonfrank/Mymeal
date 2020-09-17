import React from "react";

const ItemList = ({ itemProps, key, removeItem, addItem, allState }) => {
  const itemCount = (listCart, item) => {
    const listItem = listCart.carts.find((x) => x.id == item.id);

    if (listItem) {
      return listItem.quantity;
    } else {
      return 0;
    }
  };

  const addButton = () => {
    if (itemProps.Available) {
      return (
        <>
          <button
            class="btn btn-primary"
            data-item={`${itemProps.Name}`}
            onClick={() => removeItem(`${itemProps.id}`)}
          >
            -
          </button>
          <span class="count-list">{itemCount(allState, itemProps)}</span>
          <button
            class="btn btn-secondary rounded"
            onClick={(e) => addItem(`${itemProps.id}`)}
          >
            +
          </button>
        </>
      );
    } else {
      return <button class="btn btn-secondary">Unavailable</button>;
    }
  };

  const totalPrice = (listCart, item) => {
    const listItem = listCart.carts.find((x) => x.id == item.id);

    if (listItem) {
      return listItem.total;
    } else {
      return 0;
    }
  };
  return (
    <tr>
      <td>{itemProps.Name}</td>
      <td>${itemProps.Price}</td>
      <td>{itemProps.Available ? "Avaible" : "UnAvailable"}</td>
      <td>
        <div class="count-item">{addButton()}</div>
      </td>
      <td>{totalPrice(allState, itemProps)}</td>
    </tr>
  );
};

export default ItemList;
