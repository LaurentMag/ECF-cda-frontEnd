import React, {Fragment, useEffect, useState} from "react";
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
  return (
    <Fragment>
      <section className="client__display-container">
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
              />
            );
          })}
      </section>
    </Fragment>
  );
};
