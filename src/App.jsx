import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Form from "./components/Form";
import CartPage from "./components/CartPage";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const fetchHandle = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleAddCart = (index) => {
    const selectedProduct = products[index];
    const existingProduct = cart.find((item) => item.id === selectedProduct.id);
    if (existingProduct) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...selectedProduct, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleIncrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total number of unique products in the cart for the cart icon
  const totalQuantity = cart.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  ).length;

  return (
    <Router>
      <Navbar count={totalQuantity} />
      <Routes>
        <Route
          path="/"
          element={<Product list={products} handleAddCart={handleAddCart} />}
        />
        <Route path="/form" element={<Form fetchHandle={fetchHandle} />} />
        <Route
          path="/Cart"
          element={
            <CartPage
              cartList={cart}
              removeItemFromCart={removeItemFromCart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
