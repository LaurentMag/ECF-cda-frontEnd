import React, {Fragment, useEffect, useState} from "react";
import {vehicleType, vehicleTypeNoID} from "../type/vehicleType";

type propsType = {
  headerText: string;
  //
  vehicle: vehicleType;
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
    marque: props.vehicle.marque,
    model: props.vehicle.model,
    immatriculation: props.vehicle.immatriculation,
    etat: props.vehicle.etat,
    prixJournee: props.vehicle.prixJournee,
    disponible: props.vehicle.disponible,
    type: props.vehicle.type,
  });

  // ------------------------------------------------------------------
  /**
   *  get input target name, which will be associated with his key on the state object, and
   * update the corresponding value
   * @param e event from onChange method
   */
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
  /**
   *    once the form is submit, it send the state content to the
   * corresponding method, which will then send it to the proper service method
   * @param e event coming from form submit event
   */
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
              <label htmlFor="marqueID">Marque : </label>
              <input
                onChange={handleInputChange}
                id="marqueID"
                type="text"
                name="marque"
                value={inputState.marque}></input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="immatriculationID">Immatriculation : </label>
              <input
                onChange={handleInputChange}
                id="immatriculationID"
                type="text"
                name="immatriculation"
                value={inputState.immatriculation}></input>
            </div>
          </section>

          <section>
            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="etatID"> etat : </label>
              <input
                onChange={handleInputChange}
                id="etatID"
                type="text"
                name="dateDeetat"
                value={inputState.etat}></input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="prixID"> Prix journée : </label>
              <input
                onChange={handleInputChange}
                id="prixID"
                type="number"
                name="prix"
                value={inputState.prixJournee}></input>
            </div>
          </section>

          <section>
            <div className={``}>
              <label htmlFor="disponibleID"> Disponibilité : </label>
              <input
                onChange={handleInputChange}
                id="disponibleID"
                type="checkbox"
                name="disponible"
                checked={inputState.disponible}></input>
            </div>

            <div className={`${props.styleInputAndLabel}`}>
              <label htmlFor="typeID"> Type : </label>
              <input
                onChange={handleInputChange}
                id="typeID"
                type="text"
                name="type"
                value={inputState.type}></input>
            </div>
          </section>

          <button className="general-button">Valider</button>
        </form>
      </section>
    </Fragment>
  );
};
