import React, {useState} from "react";

export const FilterInput = () => {
  const [filter, setFilter] = useState<string>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Filtre : </label>
      <input
        onChange={handleInputChange}
        type="text"
        name="filter"></input>

      <button className="general_button"> Valider</button>
    </form>
  );
};
