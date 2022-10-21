import React from "react";
import {locationType} from "../type/locationType";
import VehiclePic from "./../assets/voiture.jpg";

type propsType = {
  locationObject: locationType;
};

export const LocationResumeUnit = (props: propsType) => {
  return (
    <section className="gestionlocation__container">
      <section className="gestionlocation_voiture">
        <figure>
          <img
            className="general_image"
            src={VehiclePic}
            alt=""
          />
        </figure>
        <section className="">
          <div>
            <p className="general_p-info-stack">
              Model : <span className="general_span-info-stack">{props.locationObject.voiture.model}</span>
            </p>
            <p className="general_p-info-stack">
              Marque : <span className="general_span-info-stack">{props.locationObject.voiture.marque}</span>
            </p>
            <p className="general_p-info-stack">
              Etat : <span className="general_span-info-stack">{props.locationObject.voiture.etat}</span>
            </p>
          </div>
        </section>
      </section>

      <div>
        <section className="gestionlocation_date">
          <p>Date : </p>
          <p>
            {props.locationObject.dateDebut} au {props.locationObject.dateDebut}
          </p>
        </section>

        <section className="gestionlocation_client">
          <div>
            <p className="general_p-info-stack">
              Nom: <span className="general_span-info-stack">{props.locationObject.client.nom}</span>
            </p>
            <p className="general_p-info-stack">
              Prenom: <span className="general_span-info-stack">{props.locationObject.client.prenom}</span>
            </p>
          </div>
          <div className="client-unit__one-info-stack">
            <p className="general_p-info-stack">
              Email: <span className="general_span-info-stack">{props.locationObject.client.email}</span>
            </p>
            <p className="general_p-info-stack">
              Telephone: <span className="general_span-info-stack">{props.locationObject.client.telephone}</span>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};
