import React, {Fragment, useState} from "react";
import {clientTypeNoID} from "../type/clientType";

type propsType = {
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  email: string;
  telephone: number;
  //
  styleFormContainer: string;
  styleInputAndLabel: string;
};

export const ClientInput = (props: propsType) => {
  // set client without ID and get value sent from props allow to have a moduable input component
  // and use it as much for client creation and client edition ( since all input will be the sames )
  const [inputState, setInputState] = useState<clientTypeNoID>({
    nom: props.nom,
    prenom: props.prenom,
    dateDeNaissance: props.dateDeNaissance,
    email: props.email,
    telephone: props.telephone,
  });

  // ------------------------------------------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    setInputState((prev) => {
      return {
        ...prev,
        [input.name]: input.value,
      };
    });
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <Fragment>
      <form>
        <div>
          <label htmlFor="nomID">Nom : </label>
          <input
            onChange={handleInputChange}
            id="nomID"
            type="text"
            name="nom"></input>
        </div>

        <div>
          <label htmlFor="prenomID">Prenom : </label>
          <input
            onChange={handleInputChange}
            id="prenomID"
            type="text"
            name="prenom"></input>
        </div>

        <div>
          <label htmlFor="naissanceID"> Naissance : </label>
          <input
            onChange={handleInputChange}
            id="naissanceID"
            type="date"
            name="dateDeNaissance"></input>
        </div>

        <div>
          <label htmlFor="emailID"> Email </label>
          <input
            onChange={handleInputChange}
            id="emailID"
            type="email"
            name="email"></input>
        </div>

        <div>
          <label htmlFor="telID"> Téléphone : </label>
          <input
            onChange={handleInputChange}
            id="telID"
            type="number"
            name="telephone"></input>
        </div>

        <button>Valider</button>
      </form>
    </Fragment>
  );
};
