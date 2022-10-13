import React, {Fragment, useEffect, useState} from "react";
import {ClientInput} from "../components/ClientInput";
import {ClientUnit} from "../components/ClientUnit";
//
import {dataServices} from "../services/dataServices";
import {clientType, clientTypeNoID} from "../type/clientType";
//
import {randomNumber} from "../services/tools";

const URLclient: string = "http://localhost:3000/clients";

export const Clients = () => {
  const [clientList, setClientList] = useState<clientType[]>();
  /**
   * useEffect used to trigger a data fetch, only the first component is created.
   */
  useEffect(() => {
    dataFetch();
  }, []);

  // ----------------------------------------------------------------------------
  /**
   * Fetch data using dataservices method, then set data in the react state
   */
  const dataFetch = () => {
    dataServices.fetchData(URLclient).then((data) => setClientList(data));
  };

  // ----------------------------------------------------------------------------

  /**
   * retrice data send from Clientinput, insert an ID and pass to to the REST POST
   * dataService method to create a client
   * @param data
   */
  const dataAdd = (data: clientTypeNoID) => {
    const addedID = {
      ...data,
      id: randomNumber(),
    };
    dataServices.postData(URLclient, addedID).then(() => dataFetch());
  };
  // ----------------------------------------------------------------------------

  const dataPatch = (id: number, data: any) => {
    dataServices.patchData(URLclient, id, data).then(() => dataFetch());
  };

  // ----------------------------------------------------------------------------
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
          /* TEXT */
          headerText="Nouveau Client : "
          /* STYLE */
          styleTopWrapper={"client__main-form-container-wrapper "}
          styleFormContainer={"client__main-form-container"}
          styleInputAndLabel={"label-input"}
          /* CLIENT DATA */
          nom={""}
          prenom={""}
          dateDeNaissance={""}
          email={""}
          telephone={0}
          /* work on data */
          addData={dataAdd}
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
                dataToPatch={dataPatch}
              />
            );
          })}
      </section>
    </Fragment>
  );
};
