import React, {Fragment, useEffect, useState} from "react";
import {vehicleTypeNoID} from "../type/vehicleType";

type propsType = {
  headerText: string;
  //
  marque: string;
  immatriculation: string;
  etat: string;
  prixJournee: number;
  disponible: boolean;
  type: string;
  //
  styleTopWrapper: string;
  styleFormContainer: string;
  styleInputAndLabel: string;
  //
  addData: Function;
};

export const VehiculeInput = (props: propsType) => {
  // set client without ID and get value sent from props allow to have a moduable input component
  // and use it as much for client creation and client edition ( since all input will be the sames )
  const [inputState, setInputState] = useState<vehicleTypeNoID>({
    marque: "",
    immatriculation: "",
    etat: "",
    prixJournee: 0,
    disponible: true,
    type: "",
  });

  // ------------------------------------------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    setInputState((prev) => {
      return {
        ...prev,
        [input.name]: input.type === "checkbox" ? input.checked : input.value,
      };
    });
  };

  // ------------------------------------------------------------------
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    props.addData(inputState);
  };
  return (
    <Fragment>
      <section className={`${props.styleTopWrapper}`}>
        <h2>{props.headerText}</h2>
        <form
          onSubmit={handleSubmit}
          className={`${props.styleFormContainer}`}>
          <section>
            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="marqueID">Marque : </label>
              <input
                onChange={handleInputChange}
                id="marqueID"
                type="text"
                name="marque">
                value={}
              </input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="immatriculationID">Immatriculation : </label>
              <input
                onChange={handleInputChange}
                id="immatriculationID"
                type="text"
                name="immatriculation">
                value={}
              </input>
            </div>
          </section>

          <section>
            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="etatID"> etat : </label>
              <input
                onChange={handleInputChange}
                id="etatID"
                type="text"
                name="dateDeetat">
                value={}
              </input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="prixID"> Prix journée : </label>
              <input
                onChange={handleInputChange}
                id="prixID"
                type="number"
                name="prix">
                value={}
              </input>
            </div>
          </section>

          <section>
            <div className={``}>
              <label htmlFor="disponibleID"> Disponibilité : </label>
              <input
                onChange={handleInputChange}
                id="disponibleID"
                type="checkbox"
                name="disponible"></input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="typeID"> Type : </label>
              <input
                onChange={handleInputChange}
                id="typeID"
                type="text"
                name="type"></input>
            </div>
          </section>

          <button className="general-button">Valider</button>
        </form>
      </section>
    </Fragment>
  );
};
