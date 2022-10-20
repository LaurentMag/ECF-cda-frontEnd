import React, {useEffect, useState} from "react";
import {vehicleType} from "../type/vehicleType";
import {dataServices} from "../services/dataServices";

const URLvoiture: string = "http://localhost:3000/voitures";

export const Gestion = () => {
  const [vehiculeList, setVehiculeList] = useState<vehicleType[]>();
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
  // ----------------------------------------------------------------------------
  return <section></section>;
};