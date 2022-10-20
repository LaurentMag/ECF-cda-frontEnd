import React, {useState, useEffect, Fragment} from "react";
import {vehicleType, vehicleTypeNoID} from "../type/vehicleType";
import {randomNumber} from "../services/tools";
import {dataServices} from "../services/dataServices";
import {VehicleUnit} from "../components/VehicleUnit";
import {VehiculeInput} from "../components/VehiculeInput";
import {FilterInput} from "../components/FilterInput";
import {filterType} from "../type/filterType";

const URLvoiture: string = "http://localhost:3000/voitures";

export const Vehicules = () => {
  const [vehiculeList, setVehiculeList] = useState<vehicleType[]>();
  const [filter, setFilter] = useState<filterType>();
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
    dataServices.fetchData(URLvoiture).then((data) => setVehiculeList(data));
  };
  // ----------------------------------------------------------------------------
  /**
   * retrice data send from Clientinput, insert an ID and pass to to the REST POST
   * dataService method to create a client
   * @param data
   */
  const dataAdd = (data: vehicleTypeNoID) => {
    console.log(data);
    const addedID = {
      ...data,
      id: randomNumber(),
    };
    dataServices.postData(URLvoiture, addedID).then(() => dataFetch());
  };
  // ----------------------------------------------------------------------------

  /**
   *
   * @param id id of the selected Vehicle object
   * @param data data coming from edit mode to patch and update somes informations
   */
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
  //FILTER

  /**
   *  Receive filter from filterinput component.
   * Use thoses parameter to only display the filtered data
   * @param filter data send from filter component
   */
  const receiveFilterData = (filter: filterType) => {
    setFilter(filter);
  };

  /**
   * Return a array containing only filtered data, or the initial list if no filter was setup
   * @returns filtered array according to filter selection
   */
  const handlefilter = (): vehicleType[] => {
    let filteredDataArr: vehicleType[] = [];

    if (vehiculeList) {
      if (!filter || filter.searchfor == "") {
        filteredDataArr = vehiculeList;
      } else {
        filteredDataArr = vehiculeList.filter((vehicle) => {
          const attrValue: string | number | boolean = vehicle[filter.filter as keyof vehicleType];
          if (typeof attrValue === "string") {
            return attrValue.toLowerCase().includes(filter.searchfor.toLowerCase());
          } else if (typeof attrValue === "boolean") {
            const checkIn: boolean = ["disponible"].includes(filter.searchfor.toLocaleLowerCase());
            return attrValue === checkIn;
          }
        });
      }
    }
    return filteredDataArr;
  };

  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  return (
    <Fragment>
      <section className="vehicle__display-container">
        <VehiculeInput
          /* TEXT */
          headerText="Nouveau Vehicule : "
          /* STYLE */
          styleTopWrapper={"client__main-form-container-wrapper"}
          styleFormContainer={"client__main-form-container"}
          styleInputAndLabel={"label-input"}
          /* CLIENT DATA */
          vehicle={{
            id: 0,
            marque: "",
            model: "",
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
          handlefilter().map((vehicule) => {
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
