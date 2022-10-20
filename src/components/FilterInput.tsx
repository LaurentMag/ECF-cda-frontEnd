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

  const changeInput = () => {
    if (filter.filter === "disponible") {
      return (
        <select
          name="searchfor"
          onChange={handleInputChange}>
          <option value="">tout</option>
          <option value="disponible">Disponible</option>
          <option value="Loue">Loué</option>
        </select>
      );
    } else if (filter.filter === "etat") {
      return (
        <select
          name="searchfor"
          onChange={handleInputChange}>
          <option value="">tout</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>
      );
    }
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

        {filter.filter === "disponible" || filter.filter === "etat" ? (
          changeInput()
        ) : (
          <input
            onChange={handleInputChange}
            type="text"
            name="searchfor"></input>
        )}

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
