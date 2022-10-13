import React from "react";

export const FilterInput = () => {
  return (
    <form>
      <label htmlFor=""></label>
      <input
        onChange={handleInputChange}
        type="text"
        name="filter"></input>
    </form>
  );
};
