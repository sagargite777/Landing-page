import "./App.css";
import React, { useState } from "react";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import DataGrid from "./Components/DataGrid";
import SearchForm from "./Components/SearchForm";

function App() {
  const [searchData, setSearchData] = useState(null);

  const handleSearch = (data) => {
    setSearchData(data);
  };

  return (
    <div className="App">
      <Home />
      <SearchForm onSearch={handleSearch} />
      <DataGrid searchData={searchData} />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
