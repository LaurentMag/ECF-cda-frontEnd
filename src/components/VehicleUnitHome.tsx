import React from "react";
import {vehicleType} from "../type/vehicleType";

import VehiclePic from "./../assets/voiture.jpg";

type propsType = {
  vehicle: vehicleType;
};

export const VehicleUnitHome = (props: propsType) => {
  return (
    <section className="vehicle-unit-home__container">
      <figure>
        <img
          className="general_image"
          src={VehiclePic}
          alt=""
        />

        <section className="vehicle-unit-home__information_container">
          <div>
            <p className="general_p-info-stack">
              Model : <span className="general_span-info-stack">{props.vehicle.model}</span>
            </p>
            <p className="general_p-info-stack">
              Marque : <span className="general_span-info-stack">{props.vehicle.marque}</span>
            </p>
          </div>
        </section>
      </figure>
    </section>
  );
};
