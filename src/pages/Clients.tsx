import React, {Fragment, useEffect, useState} from "react";
import {ClientInput} from "../components/ClientInput";
import {ClientUnit} from "../components/ClientUnit";
//
import {dataServices} from "../services/dataServices";
import {dataURL} from "../services/dataUrl";
import {clientType, clientTypeNoID} from "../type/clientType";
//
import {handlefilterClient, randomNumber} from "../services/tools";
import {FilterInput} from "../components/FilterInput";
import {filterType} from "../type/filterType";

export const Clients = () => {
  const [clientList, setClientList] = useState<clientType[]>();
  const [filter, setFilter] = useState<filterType>({
    filter: "",
    searchfor: "",
  });
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
    dataServices.fetchData(dataURL.client).then((data) => setClientList(data));
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
    dataServices.postData(dataURL.client, addedID).then(() => dataFetch());
  };
  // ----------------------------------------------------------------------------

  const dataPatch = (id: number, data: any) => {
    dataServices.patchData(dataURL.client, id, data).then(() => dataFetch());
  };

  // ----------------------------------------------------------------------------
  /**
   * Delete selected Client :
   * retrive id sent from clientUnit child delete button press
   * This id is sent to the dataservice delete method to know which client to delete
   * @param id client id coming from clientUnit map
   */
  const dataDelete = (id: number) => {
    dataServices.deleteData(dataURL.client, id).then(() => dataFetch());
  };

  // ----------------------------------------------------------------------------
  //FILTER

  /**
   *  Receive filter from filterinput component.
   * Use thoses parameter to only display the filtered data
   * @param filter data send from filter component
   */
  const receiveFilterData = (filter: filterType) => {
    setFilter(filter);
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
          telephone={""}
          /* work on data */
          addData={dataAdd}
        />

        <FilterInput
          filterOn={["nom", "prenom", "dateDeNaissance", "email", "telephone"]}
          getFilter={receiveFilterData}
        />
        {/* 
          check first if clientList isnt null / empty. if not trigger display ( && )
          prevent potential error if async fetch isnt done when comp is created
        */}
        {clientList &&
          handlefilterClient(clientList, filter).map((client) => {
            return (
              <ClientUnit
                key={client.id}
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
