import React, {useState, useEffect} from "react";
import {vehicleType, vehicleTypeNoID} from "../type/vehicleType";
import {randomNumber} from "../services/tools";
import {dataServices} from "../services/dataServices";

const URLvoiture: string = "http://localhost:3000/voitures";

export const Vehicules = () => {
  const [clientList, setClientList] = useState<vehicleType[]>();
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
    dataServices.fetchData(URLvoiture).then((data) => setClientList(data));
  };

  // ----------------------------------------------------------------------------

  /**
   * retrice data send from Clientinput, insert an ID and pass to to the REST POST
   * dataService method to create a client
   * @param data
   */
  const dataAdd = (data: vehicleTypeNoID) => {
    const addedID = {
      ...data,
      id: randomNumber(),
    };
    dataServices.postData(URLvoiture, addedID).then(() => dataFetch());
  };
  // ----------------------------------------------------------------------------

  const dataPatch = (id: number, data: any) => {
    dataServices.patchData(URLvoiture, id, data).then(() => dataFetch());
  };

  // ----------------------------------------------------------------------------
  /**
   * Delete selected Client :
   * retrive id sent from clientUnit child delete button press
   * This id is sent to the dataservice delete method to know which client to delete
   * @param id client id coming from clientUnit map
   */
  const dataDelete = (id: number) => {
    dataServices.deleteData(URLvoiture, id).then(() => dataFetch());
  };

  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  return <div>Vehicules</div>;
};
