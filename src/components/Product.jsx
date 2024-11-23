import React, { useState, useEffect } from "react";

function Product({ list, handleAddCart }) {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setProductList(list);
  }, [list]);

  const perPage = 8;
  const last = currentPage * perPage;
  const first = last - perPage;

  const filteredList = productList
    .filter(
      (val) =>
        val.title.toLowerCase().includes(search.toLowerCase()) ||
        val.price.toString().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const currentItem = filteredList.slice(first, last);
  const totalPage = Math.ceil(filteredList.length / perPage);

  return (
    <div className="container mt-4 text-light bg-dark p-4 rounded">
      <div className="search-sort-bar mb-4 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by Title or Price"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A-Z</option>
          <option value="title-desc">Title: Z-A</option>
        </select>
      </div>
      <table className="table table-striped table-bordered text-light">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>Rs. {item.price}</td>
              <td>
                <img
                  src={item.url}
                  alt={item.title}
                  className="img-thumbnail"
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddCart(i)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPage }).map((_, index) => (
              <li className="page-item" key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={
                    currentPage === index + 1 ? "page-link active" : "page-link"
                  }
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Product;
