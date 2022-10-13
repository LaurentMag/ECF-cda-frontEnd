import React, {Fragment, useState} from "react";
import {vehicleTypeNoID} from "../type/vehicleType";
import {VehiculeInput} from "./VehiculeInput";

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

  const handleDeletion = () => {
    props.dataDelete(props.id);
  };

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
          src={require("../assets/voiture.jpg")}
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
          marque={""}
          immatriculation={""}
          etat={""}
          prixJournee={0}
          disponible={true}
          type={""}
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
