import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ fetchHandle }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      price: parseFloat(price), // Ensure price is a number
      url,
    };

    // Make POST request to JSON Server
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();

      if (response.ok) {
        fetchHandle(result); // Update the product list
        setTitle("");
        setPrice("");
        setUrl(""); // Reset form fields

        // Redirect to the homepage after adding product
        navigate("/");
      } else {
        console.error("Failed to add product:", result);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-4 text-light bg-dark p-4 rounded">
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Product Price (Rs.)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="url" className="form-label">
            Product Image URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="form-control"
            placeholder="Enter product image URL"
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
