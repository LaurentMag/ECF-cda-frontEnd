import React, {useEffect, useState} from "react";
import {vehicleType} from "../type/vehicleType";
import {dataServices} from "../services/dataServices";
import {VehicleUnitHome} from "../components/VehicleUnitHome";
import {filterType} from "../type/filterType";
import {FilterInput} from "../components/FilterInput";

const URLvoiture: string = "http://localhost:3000/voitures";

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
    dataServices.fetchData(URLvoiture).then((data) => setVehiculeList(data));
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
    <section className="home__container">
      <FilterInput
        filterOn={["marque", "model", "etat", "disponible"]}
        getFilter={receiveFilterData}
      />

      {vehiculeList &&
        handlefilter().map((vehicle) => {
          return (
            <VehicleUnitHome
              key={vehicle.id}
              vehicle={vehicle}
            />
          );
        })}
    </section>
  );
};
