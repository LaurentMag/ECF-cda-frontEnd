import React, {Fragment, useState} from "react";
import {vehicleTypeNoID} from "../type/vehicleType";
import {VehiculeInput} from "./VehiculeInput";

import VehiclePic from "./../assets/voiture.jpg";

type propsType = {
  id: number;
  marque: string;
  immatriculation: string;
  etat: string;
  prixJournee: number;
  disponible: boolean;
  type: string;
  //
  dataDelete: Function;
  dataToPatch: Function;
};

export const VehicleUnit = (props: propsType) => {
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
    props.dataDelete(props.id);
  };

  /**
   *  send data from input edit mode to the patch to udpate informations
   * @param data Once submit, change the edit value to close the edit mode
   */
  const dataToUpdate = (data: vehicleTypeNoID) => {
    /* It's a function that is not implemented yet. */
    props.dataToPatch(props.id, data);
    setIsEdit((prev) => !prev);
  };

  return (
    <section className="Vehicle__unit-main-container">
      <figure>
        <img
          className="general_image"
          src={VehiclePic}
          alt=""
        />
      </figure>

      {isEdit ? (
        <VehiculeInput
          /* TEXT */
          headerText="Nouveau Vehicule : "
          /* STYLE */
          styleTopWrapper={""}
          styleFormContainer={""}
          styleInputAndLabel={"label-input"}
          /* CLIENT DATA */
          marque={props.marque}
          immatriculation={props.immatriculation}
          etat={props.etat}
          prixJournee={props.prixJournee}
          disponible={props.disponible}
          type={props.type}
          /* work on data */
          addData={dataToUpdate}
        />
      ) : (
        <section>
          <p>Marque : {props.marque}</p>
          <p>Immatriculation : {props.immatriculation}</p>
          <p>Etat : {props.etat}</p>
          <p>Prix : {props.prixJournee}</p>
          <p>Disponibilité : {props.disponible ? "disponible" : "Loué"}</p>
          <p>Type : {props.type}</p>
        </section>
      )}

      <section>
        <button
          className="general-button"
          onClick={handleEdit}>
          Edit
        </button>
        <button
          className="general-button"
          onClick={handleDeletion}>
          Delete
        </button>
      </section>
    </section>
  );
};
