import React, {Fragment, useEffect, useState} from "react";
import {ClientInput} from "../components/ClientInput";
import {ClientUnit} from "../components/ClientUnit";
//
import {dataServices} from "../services/dataServices";
import {clientType} from "../type/clientType";

const URLclient: string = "http://localhost:3000/clients";

export const Clients = () => {
  const [clientList, setClientList] = useState<clientType[]>();

  // ------------------------------------------------------------------
  /**
   * useEffect used to trigger a data fetch, only the first component is created.
   */
  useEffect(() => {
    dataFetch();
  }, []);

  // ------------------------------------------------------------------

  /**
   * Fetch data using dataservices method, then set data in the react state
   */
  const dataFetch = () => {
    dataServices.fetchData(URLclient).then((data) => setClientList(data));
  };

  // ------------------------------------------------------------------

  // ------------------------------------------------------------------

  // ------------------------------------------------------------------

  /**
   * Delete selected Client :
   * retrive id sent from clientUnit child delete button press
   * This id is sent to the dataservice delete method to know which client to delete
   * @param id client id coming from clientUnit map
   */
  const dataDelete = (id: number) => {
    dataServices.deleteData(URLclient, id).then(() => dataFetch());
  };

  // ------------------------------------------------------------------
  // ------------------------------------------------------------------
  return (
    <Fragment>
      <section className="client__display-container">
        <ClientInput
          /* STYLE */
          styleFormContainer={"client__main-form-container"}
          styleInputAndLabel={""}
          /* CLIENT DATA */
          nom={""}
          prenom={""}
          dateDeNaissance={""}
          email={""}
          telephone={0}
        />
        {/* 
          check first if clientList isnt null / empty. if not trigger display ( && )
          prevent potential error if async fetch isnt done when comp is created
        */}
        {clientList &&
          clientList.map((client) => {
            return (
              <ClientUnit
                id={client.id}
                nom={client.nom}
                prenom={client.prenom}
                dateDeNaissance={client.dateDeNaissance}
                email={client.email}
                telephone={client.telephone}
                dataDelete={dataDelete}
              />
            );
          })}
      </section>
    </Fragment>
  );
};
