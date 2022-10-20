import React, {useState} from "react";
import {vehicleType} from "../type/vehicleType";

import VehiclePic from "./../assets/voiture.jpg";
import {Button} from "./Button";
import {Modal} from "./Modal";

type propsType = {
  vehicle: vehicleType;
};

export const VehicleUnitHome = (props: propsType) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleModal = () => {};

  return (
    <section className="vehicle-unit-home__container">
      <Modal
        isModalOpen={isModalVisible}
        handleModalState={showModal}
      />
      <figure>
        <img
          className="general_image"
          src={VehiclePic}
          alt=""
        />
      </figure>

      <section className="vehicle-unit-home__information_container">
        <div>
          <p className="general_p-info-stack">
            Model : <span className="general_span-info-stack">{props.vehicle.model}</span>
          </p>
          <p className="general_p-info-stack">
            Marque : <span className="general_span-info-stack">{props.vehicle.marque}</span>
          </p>
          <p className="general_p-info-stack">
            Etat : <span className="general_span-info-stack">{props.vehicle.etat}</span>
          </p>
        </div>

        <div className={`${props.vehicle.disponible ? "vehicle_aviable" : "vehicle_rented"}`}>
          <p className="general_p-info-stack">
            Prix : <span className="general_span-info-stack">{props.vehicle.prixJournee} € / la journée</span>
          </p>
          <p className="general_p-info-stack">
            Disponibilité :{"   "}
            <span className="general_span-info-stack">{props.vehicle.disponible ? "Disponible" : "Loué"}</span>
          </p>
        </div>

        <Button
          content={"Louer"}
          extraCssClass={""}
          handleClick={showModal}
        />
      </section>
    </section>
  );
};
