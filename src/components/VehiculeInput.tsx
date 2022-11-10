import React, {Fragment, useEffect, useState} from "react";
import {vehicleType, vehicleTypeNoID} from "../type/vehicleType";
import {Button} from "./Button";
//
import {BiCheckSquare} from "react-icons/bi";
import {BiArrowBack} from "react-icons/bi";

type propsType = {
  headerText: string;
  isEdit: boolean;
  //
  vehicle: vehicleType;
  //
  styleSectionMainContainer: string;
  styleFormContainer: string;
  styleSectionWrapper: string;
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

  /**
   * get select input target value to pass it to corresponding attribute.
   * Second method is needed as multiple ts event typing do not work with the checked
   * @param e react event for select input
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setInputState((prev) => {
      return {
        ...prev,
        [name]: value,
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
      <section className={`${props.styleSectionMainContainer}`}>
        {props.headerText && <h2>{props.headerText}</h2>}
        <form
          onSubmit={handleSubmit}
          className={`${props.styleFormContainer}`}>
          <section className={`${props.styleSectionWrapper}`}>
            <div>
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
                <label htmlFor="modelID">Model : </label>
                <input
                  onChange={handleInputChange}
                  id="modelID"
                  type="text"
                  name="model"
                  value={inputState.model}></input>
              </div>
              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="immatriculationID">Plaque : </label>
                <input
                  onChange={handleInputChange}
                  id="immatriculationID"
                  type="text"
                  name="immatriculation"
                  value={inputState.immatriculation}></input>
              </div>
            </div>

            <div>
              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="typeID"> Type : </label>
                <input
                  onChange={handleInputChange}
                  id="typeID"
                  type="text"
                  name="type"
                  value={inputState.type}></input>
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

              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="etatID"> Etat : </label>
                {/*  */}
                <select
                  className="input-select"
                  id="etatID"
                  name="etat"
                  value={inputState.etat}
                  onChange={handleSelectChange}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
                {/*  */}
              </div>
            </div>

            {props.isEdit && (
              <div className={`vehicle_aviability-info ${props.styleInputAndLabel}`}>
                <label htmlFor="disponibleID"> Disponibilité : </label>
                <input
                  onChange={handleInputChange}
                  id="disponibleID"
                  type="checkbox"
                  name="disponible"
                  checked={inputState.disponible}></input>
              </div>
            )}
          </section>

          {!props.isEdit ? (
            <div>
              <Button
                content={<BiCheckSquare className="icon-style" />}
                extraCssClass={"accept"}
                handleClick={() => {}}
                disabled={false}
              />
            </div>
          ) : (
            <section className="element-unit__section-button vehicle-section-button-surcharge">
              <Button
                content={<BiArrowBack className="icon-style" />}
                extraCssClass={""}
                handleClick={() => {}}
                disabled={false}
              />
              <Button
                content={<BiCheckSquare className="icon-style" />}
                extraCssClass={"accept"}
                handleClick={() => {}}
                disabled={false}
              />
            </section>
          )}
        </form>
      </section>
    </Fragment>
  );
};
