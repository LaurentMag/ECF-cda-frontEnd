import React, {useState, useEffect, Fragment} from "react";
import {vehicleType, vehicleTypeNoID} from "../type/vehicleType";
import {randomNumber} from "../services/tools";
import {dataServices} from "../services/dataServices";
import {VehicleUnit} from "../components/VehicleUnit";
import {VehiculeInput} from "../components/VehiculeInput";
import {FilterInput} from "../components/FilterInput";

const URLvoiture: string = "http://localhost:3000/voitures";

export const Vehicules = () => {
  const [vehiculeList, setVehiculeList] = useState<vehicleType[]>();
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
  return (
    <Fragment>
      <section className="vehicle__display-container">
        <VehiculeInput
          /* TEXT */
          headerText="Nouveau Vehicule : "
          /* STYLE */
          styleTopWrapper={"client__main-form-container-wrapper "}
          styleFormContainer={"client__main-form-container"}
          styleInputAndLabel={"label-input"}
          /* CLIENT DATA */
          marque={""}
          immatriculation={""}
          etat={""}
          prixJournee={0}
          disponible={true}
          type={""}
          /* work on data */
          addData={dataAdd}
        />

        <FilterInput />
        {vehiculeList &&
          vehiculeList.map((vehicule) => {
            return (
              <VehicleUnit
                id={vehicule.id}
                marque={vehicule.marque}
                immatriculation={vehicule.immatriculation}
                etat={vehicule.etat}
                prixJournee={vehicule.prixJournee}
                disponible={vehicule.disponible}
                type={vehicule.type}
                dataDelete={dataDelete}
                dataToPatch={dataPatch}
              />
            );
          })}
      </section>
    </Fragment>
  );
};
