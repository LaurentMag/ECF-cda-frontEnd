import React, {Fragment, useEffect, useState} from "react";
//
import {vehicleType} from "../type/vehicleType";
import {filterType} from "../type/filterType";
import {FilterInput} from "../components/FilterInput";
import {dataServices} from "../services/dataServices";
import {dataURL} from "../services/dataUrl";
//
import {VehicleUnitHome} from "../components/VehicleUnitHome";
import {handlefilterVehicle} from "../services/tools";

export const HomePage = () => {
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

  /**
   * Fetch data using dataservices method, then set data in the react state
   */
  const dataFetch = () => {
    dataServices.fetchData(dataURL.vehicles).then((data) => setVehiculeList(data));
  };

  /**
   *
   * @param id id of the selected Vehicle object
   * @param data data coming from edit mode to patch and update somes informations
   */
  const dataPatchVehicle = (id: number, data: any) => {
    dataServices.patchData(dataURL.vehicles, id, data).then(() => dataFetch());
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
      <FilterInput
        filterOn={["marque", "model", "etat", "disponible"]}
        getFilter={receiveFilterData}
      />

      <section className="home__container">
        {vehiculeList &&
          handlefilterVehicle(vehiculeList, filter).map((vehicle) => {
            return (
              <VehicleUnitHome
                key={vehicle.id}
                vehicle={vehicle}
                dataPatchVehicle={dataPatchVehicle}
              />
            );
          })}
      </section>
    </Fragment>
  );
};
