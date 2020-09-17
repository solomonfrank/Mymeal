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
        <div class="count-item">
          <button
            class="btn"
            data-item={`${itemProps.Name}`}
            onClick={() => removeItem(`${itemProps.id}`)}
          >
            -
          </button>
          <span>{itemCount(allState, itemProps)}</span>
          <button class="btn" onClick={(e) => addItem(`${itemProps.id}`)}>
            +
          </button>
        </div>
      </td>
      <td>{totalPrice(allState, itemProps)}</td>
    </tr>
  );
};

export default ItemList;
