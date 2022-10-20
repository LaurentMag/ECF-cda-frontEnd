import React, {Fragment, useEffect, useState} from "react";
import {vehicleType} from "../type/vehicleType";
import {dataServices} from "../services/dataServices";
import {locationType} from "../type/locationType";
import {LocationResumeUnit} from "../components/LocationResumeUnit";

const URLlocation: string = "http://localhost:3000/location";

export const Gestion = () => {
  const [locationList, setLocationList] = useState<locationType[]>();
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
    dataServices.fetchData(URLlocation).then((data) => setLocationList(data));
  };

  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  return (
    <section className="gestion__main-container">
      {locationList &&
        locationList.map((element) => {
          return (
            <LocationResumeUnit
              key={element.id}
              locationObject={element}
            />
          );
        })}
    </section>
  );
};
