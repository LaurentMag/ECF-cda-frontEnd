import React, {Fragment, useEffect, useState} from "react";
import {clientTypeNoID} from "../type/clientType";

type propsType = {
  headerText: string;
  //
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  email: string;
  telephone: number;
  //
  styleTopWrapper: string;
  styleFormContainer: string;
  styleInputAndLabel: string;
  //
  addData: Function;
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
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    props.addData(inputState);
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <Fragment>
      <section className={`${props.styleTopWrapper}`}>
        <h2>{props.headerText}</h2>
        <form
          onSubmit={handleSubmit}
          className={`${props.styleFormContainer}`}>
          <section>
            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="nomID">Nom : </label>
              <input
                onChange={handleInputChange}
                id="nomID"
                type="text"
                name="nom"></input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="prenomID">Prenom : </label>
              <input
                onChange={handleInputChange}
                id="prenomID"
                type="text"
                name="prenom"></input>
            </div>
          </section>

          <section>
            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="naissanceID"> Naissance : </label>
              <input
                onChange={handleInputChange}
                id="naissanceID"
                type="date"
                name="dateDeNaissance"></input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="emailID"> Email : </label>
              <input
                onChange={handleInputChange}
                id="emailID"
                type="email"
                name="email"></input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="telID"> Téléphone : </label>
              <input
                onChange={handleInputChange}
                id="telID"
                type="text"
                name="telephone"></input>
            </div>
          </section>

          <button className="general-button">Valider</button>
        </form>
      </section>
    </Fragment>
  );
};
