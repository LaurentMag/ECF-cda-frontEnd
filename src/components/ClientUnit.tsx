import React, {useState, Fragment} from "react";
import {clientType, clientTypeNoID} from "../type/clientType";
import {ClientInput} from "./ClientInput";

import {BiEraser} from "react-icons/bi";
import {BiPencil} from "react-icons/bi";
import {Button} from "./Button";

type propType = {
  client: clientType;
  dataDelete: Function;
  dataToPatch: Function;
};

export const ClientUnit = (props: propType) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // ------------------------------------------------------------------

  /**
   * on click change boolean state to trigger the edit mode
   * if isEdit is true
   * @returns setState change
   */
  const handleEdit = () => setIsEdit((prev) => !prev);
  // ------------------------------------------------------------------

  /**
   * get selected vehicle ID, will be send to
   * the functin calling the deletion method from dataServices
   */
  const handleDeletion = () => {
    props.dataDelete(props.client.id);
  };

  /**
   *  send data from input edit mode to the patch to udpate informations
   * @param data Once submit, change the edit value to close the edit mode
   */
  const dataToUpdate = (data: clientTypeNoID) => {
    props.dataToPatch(props.client.id, data);
    setIsEdit((prev) => !prev);
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <section className={`client-unit__container  ${isEdit ? "edition_mode" : ""}`}>
      {isEdit ? (
        <ClientInput
          headerText=""
          isEdit={isEdit}
          /* CLIENT DATA */
          client={props.client}
          /* work on data */
          addData={dataToUpdate}
          switchEditMode={handleEdit}
          /* STYLE */
          styleSectionMainContainer={"client__edit-ignore_main-container"}
          styleFormContainer={"input__form-element"}
          styleSectionWrapper={"input_wrapper client-input_wrapper-width-edit"}
          styleInputAndLabel={"label-input"}
        />
      ) : (
        <Fragment>
          <section className={`client-unit__info-wrapper`}>
            <div className="client-unit__one-info-stack">
              <p className="general_p-info-stack">
                Nom: <span className="general_span-info-stack">{props.client.nom}</span>
              </p>
              <p className="general_p-info-stack">
                Prenom: <span className="general_span-info-stack">{props.client.prenom}</span>
              </p>
            </div>
            <div className="client-unit__one-info-stack">
              <p className="general_p-info-stack">
                Naissance: <span className="general_span-info-stack">{props.client.dateDeNaissance}</span>
              </p>
              <p className="general_p-info-stack">
                Email: <span className="general_span-info-stack">{props.client.email}</span>
              </p>
              <p className="general_p-info-stack">
                Telephone: <span className="general_span-info-stack">{props.client.telephone}</span>
              </p>
            </div>
          </section>

          <section className="element-unit__section-button  client-section-button-surcharge">
            <Button
              content={<BiPencil className="icon-style" />}
              extraCssClass={"edit"}
              handleClick={handleEdit}
              disabled={false}
            />
            <Button
              content={<BiEraser className="icon-style" />}
              extraCssClass={"delete"}
              handleClick={handleDeletion}
              disabled={false}
            />
          </section>
        </Fragment>
      )}
    </section>
  );
};
