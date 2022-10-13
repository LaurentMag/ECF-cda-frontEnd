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
      <p>Nom: {props.nom}</p>
      <p>Prenom: {props.prenom}</p>
      <p>date de naissance: {props.dateDeNaissance}</p>
      <p>Email: {props.email}</p>
      <p>Telephone: {props.telephone}</p>

      <section>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDeletion}>Delete</button>
      </section>
    </section>
  );
};
