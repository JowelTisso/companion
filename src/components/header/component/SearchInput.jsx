import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({ applySearch }) => {
  return (
    <div className="input-container search-icon-container">
      <IoSearchOutline className="search-icon" />
      <input
        type="text"
        className="input-simple "
        placeholder="Search"
        onKeyUp={applySearch}
      />
    </div>
  );
};

export default SearchInput;
