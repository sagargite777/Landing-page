import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchData = {
      status,
      type,
    };

    // Check if all search fields are empty
    const isEmptySearch = Object.values(searchData).every(
      (value) => value === ""
    );

    if (isEmptySearch) {
      // Handle the case when all search fields are empty
      // Show all records or display an error message
      onSearch(); // Call onSearch without any search data to indicate a request for all records
    } else {
      // Perform the search with the provided search data
      onSearch(searchData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }} id="capsule">
      <div className="col-12 d-flex justify-content-center">
        <div className="col-8">
          <div className="d-flex justify-content-center search-form">
            <input
              className="form-control small-input mr-2"
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <input
              className="form-control small-input ml-2"
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <button
              className="btn btn-sm btn-primary left_space ml-2"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
