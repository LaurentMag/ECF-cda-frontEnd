import React, {Fragment, useEffect, useState} from "react";
import {clientType, clientTypeNoID} from "../type/clientType";
import {Button} from "./Button";
//
import {BiCheckSquare} from "react-icons/bi";
import {BiArrowBack} from "react-icons/bi";

type propsType = {
  headerText: string;
  isEdit: boolean;
  //
  client: clientType;
  //
  addData: Function;
  switchEditMode: Function;
  //
  styleSectionMainContainer: string;
  styleFormContainer: string;
  styleSectionWrapper: string;
  styleInputAndLabel: string;
};

export const ClientInput = (props: propsType) => {
  // set client without ID and get value sent from props allow to have a moduable input component
  // and use it as much for client creation and client edition ( since all input will be the sames )
  const [inputState, setInputState] = useState<clientTypeNoID>({
    nom: props.client.nom,
    prenom: props.client.prenom,
    dateDeNaissance: props.client.dateDeNaissance,
    email: props.client.email,
    telephone: props.client.telephone,
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
        [input.name]: input.value,
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
  /**
   * switch the edit mod to show or hide the unit edition form
   * @param e event from button click event
   */
  const handleEditChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.switchEditMode();
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <Fragment>
      <section className={`${props.styleSectionMainContainer}`}>
        {/* check if headerText is empty (so false), if so */}
        {!props.isEdit && <h2>{props.headerText}</h2>}
        <form
          onSubmit={handleSubmit}
          className={`${props.styleFormContainer}`}>
          <section className={`${props.styleSectionWrapper}`}>
            <div>
              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="nomID">Nom : </label>
                <input
                  onChange={handleInputChange}
                  id="nomID"
                  type="text"
                  name="nom"
                  value={inputState.nom}></input>
              </div>

              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="prenomID">Prenom : </label>
                <input
                  onChange={handleInputChange}
                  id="prenomID"
                  type="text"
                  name="prenom"
                  value={inputState.prenom}></input>
              </div>
            </div>

            <div>
              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="naissanceID"> Naissance : </label>
                <input
                  onChange={handleInputChange}
                  id="naissanceID"
                  type="date"
                  name="dateDeNaissance"
                  value={inputState.dateDeNaissance}></input>
              </div>

              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="emailID"> Email : </label>
                <input
                  onChange={handleInputChange}
                  id="emailID"
                  type="email"
                  name="email"
                  value={inputState.email}></input>
              </div>

              <div className={`${props.styleInputAndLabel}`}>
                <label htmlFor="telID"> Téléphone : </label>
                <input
                  onChange={handleInputChange}
                  id="telID"
                  type="text"
                  name="telephone"
                  value={inputState.telephone}></input>
              </div>
            </div>
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
            <section className="element-unit__section-button client-section-button-surcharge">
              <Button
                content={<BiArrowBack className="icon-style" />}
                extraCssClass={""}
                handleClick={handleEditChange}
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
