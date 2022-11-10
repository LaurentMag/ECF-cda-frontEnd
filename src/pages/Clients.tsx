import React, {Fragment, useEffect, useState} from "react";
import {ClientInput} from "../components/ClientInput";
import {ClientUnit} from "../components/ClientUnit";
//
import {dataServices} from "../services/dataServices";
import {dataURL} from "../services/dataUrl";
import {clientType, clientTypeNoID} from "../type/clientType";
//
import {tools} from "../services/tools";
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
   * retrive data send from Clientinput, insert an ID and pass to to the REST POST
   * dataService method to create a client
   * @param data
   */
  const dataAdd = (data: clientTypeNoID) => {
    const addedID = {
      ...data,
      id: tools.randomNumber(),
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
          headerText="Nouveau Client : "
          isEdit={false}
          /* CLIENT DATA */
          client={{
            id: 0,
            nom: "",
            prenom: "",
            dateDeNaissance: "",
            email: "",
            telephone: "",
          }}
          /* work on data */
          addData={dataAdd}
          switchEditMode={() => {}}
          /* STYLE */
          styleSectionMainContainer={"input__main-container"}
          styleFormContainer={"input__form-element"}
          styleSectionWrapper={"input_wrapper"}
          styleInputAndLabel={"label-input"}
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
          tools.handlefilterClient(clientList, filter).map((client) => {
            return (
              <ClientUnit
                key={client.id}
                client={client}
                dataDelete={dataDelete}
                dataToPatch={dataPatch}
              />
            );
          })}
      </section>
    </Fragment>
  );
};
