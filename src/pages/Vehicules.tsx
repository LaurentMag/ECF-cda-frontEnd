import React, {useState, useEffect, Fragment} from "react";
//
import {vehicleType, vehicleTypeNoID} from "../type/vehicleType";
import {filterType} from "../type/filterType";
import {tools} from "../services/tools";
import {dataServices} from "../services/dataServices";
import {dataURL} from "../services/dataUrl";
//
import {VehicleUnit} from "../components/VehicleUnit";
import {VehiculeInput} from "../components/VehiculeInput";
import {FilterInput} from "../components/FilterInput";

export const Vehicules = () => {
  const [vehiculeList, setVehiculeList] = useState<vehicleType[]>();
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
    dataServices.fetchData(dataURL.vehicles).then((data) => setVehiculeList(data));
  };
  // ----------------------------------------------------------------------------
  /**
   * retrive data send from Clientinput, insert an ID and pass to to the REST POST
   * dataService method to create a client
   * @param data
   */
  const dataAdd = (data: vehicleTypeNoID) => {
    console.log(data);
    const addedID = {
      ...data,
      id: String(tools.randomNumber()),
    };
    dataServices.postData(dataURL.vehicles, addedID).then(() => dataFetch());
  };
  // ----------------------------------------------------------------------------

  /**
   *
   * @param id id of the selected Vehicle object
   * @param data data coming from edit mode to patch and update somes informations
   */
  const dataPatch = (id: number, data: any) => {
    dataServices.patchData(dataURL.vehicles, id, data).then(() => dataFetch());
  };

  // ----------------------------------------------------------------------------
  /**
   * Delete selected Client :
   * retrive id sent from clientUnit child delete button press
   * This id is sent to the dataservice delete method to know which client to delete
   * @param id client id coming from clientUnit map
   */
  const dataDelete = (id: number) => {
    dataServices.deleteData(dataURL.vehicles, id).then(() => dataFetch());
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

  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  return (
    <Fragment>
      <section className="vehicle__display-container">
        <VehiculeInput
          /* TEXT */
          headerText="Nouveau Vehicule : "
          isEdit={false}
          /* STYLE */
          styleSectionMainContainer={"input__main-container"}
          styleFormContainer={"input__form-element"}
          styleSectionWrapper={"input_wrapper"}
          styleInputAndLabel={"label-input"}
          /* VEHICLE DATA */
          vehicle={{
            id: "0",
            marque: "",
            modele: "",
            immatriculation: "",
            etat: "",
            prixJournee: 0,
            disponible: true,
            type: "",
          }}
          /* work on data */
          addData={dataAdd}
        />

        <FilterInput
          filterOn={["marque", "model", "immatriculation", "etat", "type", "disponible"]}
          getFilter={receiveFilterData}
        />

        {vehiculeList &&
          tools.handlefilterVehicle(vehiculeList, filter).map((vehicule) => {
            return (
              <VehicleUnit
                key={vehicule.id}
                vehicle={vehicule}
                dataDelete={dataDelete}
                dataToPatch={dataPatch}
              />
            );
          })}
      </section>
    </Fragment>
  );
};
