import React, {Fragment, useEffect, useState} from "react";
//
import {dataURL} from "../services/dataUrl";
import {dataServices} from "../services/dataServices";
import {locationType} from "../type/locationType";
//
import {LocationResumeUnit} from "../components/LocationResumeUnit";

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
    dataServices.fetchData(dataURL.location).then((data) => setLocationList(data));
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
