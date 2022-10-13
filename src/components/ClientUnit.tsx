import React, {useState} from "react";
import {clientType} from "../type/clientType";

type propType = {
  id: number;
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  email: string;
  telephone: string;
  dataDelete: Function;
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

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <section className="client-unit__container">
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
