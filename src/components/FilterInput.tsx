import React, {useState} from "react";
import {filterType} from "../type/filterType";
import {Button} from "./Button";

type propsType = {
  filterOn: string[];
  getFilter: Function;
};

export const FilterInput = (props: propsType) => {
  const [filter, setFilter] = useState<filterType>({
    filter: props.filterOn[0],
    searchfor: "",
  });

  // ------------------------------------------------------------------
  /**
   * gather the filter and the searched input from user which will be save in a state
   * @param e input & select html element on change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // ------------------------------------------------------------------
  /**
   * Send filter state object to be processed in the parent composent
   * @param e form submit event
   */
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    props.getFilter(filter);
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <form
      className="filter__form-container"
      onSubmit={handleSubmit}>
      <label htmlFor="selectID">Filtre : </label>
      <div className="">
        <select
          name="filter"
          id="selectID"
          onChange={handleInputChange}>
          {props.filterOn.map((filter, index) => {
            return (
              <option
                key={index}
                value={`${filter}`}>
                {filter}
              </option>
            );
          })}
        </select>

        <input
          onChange={handleInputChange}
          type="text"
          name="searchfor"></input>

        <Button
          content={"valider"}
          extraCssClass={""}
          disabled={false}
          handleClick={() => {}}
        />
      </div>
    </form>
  );
};
