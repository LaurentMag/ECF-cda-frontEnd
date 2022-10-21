import React, {Fragment, useEffect, useState} from "react";
//
import {vehicleType} from "../type/vehicleType";
import {filterType} from "../type/filterType";
import {FilterInput} from "../components/FilterInput";
import {dataServices} from "../services/dataServices";
import {dataURL} from "../services/dataUrl";
//
import {VehicleUnitHome} from "../components/VehicleUnitHome";

export const HomePage = () => {
  const [vehiculeList, setVehiculeList] = useState<vehicleType[]>();
  const [filter, setFilter] = useState<filterType>();
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
      <FilterInput
        filterOn={["marque", "model", "etat", "disponible"]}
        getFilter={receiveFilterData}
      />

      <section className="home__container">
        {vehiculeList &&
          handlefilter().map((vehicle) => {
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
