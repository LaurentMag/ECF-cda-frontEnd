import React from "react";
import {clientType} from "../type/clientType";

export const ClientUnit = (props: clientType) => {
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
        <button>Edit</button>
        <button>Delete</button>
      </section>
    </section>
  );
};
