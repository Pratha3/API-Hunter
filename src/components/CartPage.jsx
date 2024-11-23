import React from "react";

function CartPage({
  cartList,
  removeItemFromCart,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <div className="container mt-4 text-light bg-dark p-4 rounded">
      <h2>Your Cart</h2>
      {cartList.length > 0 ? (
        cartList.map((item) => (
          <div
            className="card mb-3 shadow-sm bg-secondary text-light"
            key={item.id}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={item.url}
                  className="img-fluid rounded-start"
                  alt={item.title}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: Rs. {item.price}</p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border bg-light text-dark rounded">
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-sm btn-success ms-2"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-warning text-dark bg-light" role="alert">
          No items in the cart.
        </div>
      )}
    </div>
  );
}

export default CartPage;
