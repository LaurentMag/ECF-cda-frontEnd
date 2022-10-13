import React, {useState, Fragment} from "react";
import {clientType, clientTypeNoID} from "../type/clientType";
import {ClientInput} from "./ClientInput";

type propType = {
  id: number;
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  email: string;
  telephone: number;
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

  const handleDeletion = () => {
    props.dataDelete(props.id);
  };

  const dataToUpdate = (data: clientTypeNoID) => {
    props.dataToPatch(props.id, data);
    setIsEdit((prev) => !prev);
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <section className="client-unit__container">
      {isEdit ? (
        <ClientInput
          headerText="Edit Client : "
          /* STYLE */
          styleTopWrapper={""}
          styleFormContainer={"client__main-form-edit"}
          styleInputAndLabel={"label-input"}
          /* CLIENT DATA */
          nom={""}
          prenom={""}
          dateDeNaissance={""}
          email={""}
          telephone={0}
          /* work on data */
          addData={dataToUpdate}
        />
      ) : (
        <Fragment>
          <div>
            <p>
              Nom: <span>{props.nom}</span>
            </p>
            <p>
              Prenom: <span>{props.prenom}</span>
            </p>
          </div>
          <div>
            <p>
              Naissance: <span>{props.dateDeNaissance}</span>
            </p>
            <p>
              Email: <span>{props.email}</span>
            </p>
            <p>
              Telephone: <span>{props.telephone}</span>
            </p>
          </div>
        </Fragment>
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
