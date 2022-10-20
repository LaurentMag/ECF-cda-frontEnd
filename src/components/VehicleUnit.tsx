import React, {Fragment, useState} from "react";
import {vehicleType, vehicleTypeNoID} from "../type/vehicleType";
import {VehiculeInput} from "./VehiculeInput";

import VehiclePic from "./../assets/voiture.jpg";

type propsType = {
  vehicle: vehicleType;
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
    props.dataDelete(props.vehicle.id);
  };

  /**
   *  send data from input edit mode to the patch to udpate informations
   * @param data Once submit, change the edit value to close the edit mode
   */
  const dataToUpdate = (data: vehicleTypeNoID) => {
    /* It's a function that is not implemented yet. */
    props.dataToPatch(props.vehicle.id, data);
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
          headerText=""
          /* STYLE */
          styleTopWrapper={""}
          styleFormContainer={""}
          styleInputAndLabel={"label-input"}
          /* CLIENT DATA */
          vehicle={props.vehicle}
          /* work on data */
          addData={dataToUpdate}
        />
      ) : (
        <section>
          <div>
            <p className="general_p-info-stack">
              Model : <span className="general_span-info-stack">{props.vehicle.model}</span>
            </p>
            <p className="general_p-info-stack">
              Marque : <span className="general_span-info-stack">{props.vehicle.marque}</span>
            </p>
          </div>

          <div>
            <p className="general_p-info-stack">
              Prix : <span className="general_span-info-stack">{props.vehicle.prixJournee}</span>
            </p>
            <p className="general_p-info-stack">
              Plaque : <span className="general_span-info-stack">{props.vehicle.immatriculation}</span>
            </p>
            <p className="general_p-info-stack">
              Type : <span className="general_span-info-stack">{props.vehicle.type}</span>
            </p>
            <p className="general_p-info-stack">
              Etat : <span className="general_span-info-stack">{props.vehicle.etat}</span>
            </p>
          </div>

          <div className={`${props.vehicle.disponible ? "vehicle_aviable" : "vehicle_rented"}`}>
            <p className="general_p-info-stack">
              Disponibilité :{"   "}
              <span className="general_span-info-stack">{props.vehicle.disponible ? "Disponible" : "Loué"}</span>
            </p>
          </div>
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
