import React, {ChangeEvent, Fragment, useEffect, useState} from "react";
//
import {randomNumber, rentalPriceCalculation} from "../services/tools";
import {dataServices} from "../services/dataServices";
import {dataURL} from "../services/dataUrl";
import {clientType} from "../type/clientType";
import {vehicleType} from "../type/vehicleType";
import {locationType} from "../type/locationType";
//
import {Button} from "./Button";

type propsType = {
  isModalOpen: boolean;
  vehicle: vehicleType;
  handleModalState: Function;
  dataPatchVehicle: Function;
};

export const Modal = (props: propsType) => {
  const [clientList, setClientList] = useState<clientType[]>();

  const [locationObj, setLocationObj] = useState<locationType>({
    id: 0,
    dateDebut: "",
    dateFin: "",
    prix: props.vehicle.prixJournee,
    client: {
      id: 0,
      nom: "",
      prenom: "",
      dateDeNaissance: "",
      email: "",
      telephone: "",
    },
    voiture: {
      id: 0,
      marque: "",
      model: "",
      immatriculation: "",
      etat: "",
      prixJournee: 0,
      disponible: true,
      type: "",
    },
  });

  /**
   * create a new date and transform it into YYYY-MM-DD to be able to be apply it to the date input
   * Add on day to the current date before return it
   * @returns return a date in format YYYY-MM-DD
   */
  const changeDate = (): string => {
    const dateNowArray = new Date().toLocaleDateString().split("/");
    dateNowArray[0] = String(+dateNowArray[0] + 1);
    return dateNowArray.reverse().join("-");
  };

  const [modalInput, setModalInput] = useState({
    date1: `${new Date().toLocaleDateString().split("/").reverse().join("-")}`,
    date2: `${changeDate()}`,
    clientID: 0,
  });
  // --------------------------------------------------------------------
  /**
   * useEffect used to trigger a data fetch, only the first component is created.
   */
  useEffect(() => {
    dataFetchClient();
  }, []);
  /**
   * Fetch data using dataservices method, then set data in the react state
   */
  const dataFetchClient = () => {
    dataServices.fetchData(dataURL.client).then((data) => setClientList(data));
  };
  /**
   * retrice data send from Clientinput, insert an ID and pass to to the REST POST
   * dataService method to create a client
   * @param data
   */
  const dataAddLocation = (data: locationType) => {
    dataServices.postData(dataURL.location, data);
  };

  // --------------------------------------------------------------------
  // MODAL STATE HANDLING
  /**
   *  send the mouse event to parent page to close the modal
   * @param e mouse click event
   */
  const handleModalState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.handleModalState(e);
  };

  const ignoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // remove prevent default otherwise input date click do not work
    //e.preventDefault();
    // just stop the propagation to above node to prevent modal closing on "content click"
    e.stopPropagation();
  };

  // --------------------------------------------------------------------
  // DATE / CLIENT ID HANDLING

  /**
   * gather input value and set them into modal state object
   * get : start date / end Date / client ID ( change string to number )
   * @param e input change event
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setModalInput((prev) => {
      return {
        ...prev,
        [name]: name === "selected" ? Number(value) : value,
      };
    });
  };

  // --------------------------------------------------------------------
  // --------------------------------------------------------------------
  // RENTAL VALIDATION:

  // ---------------------------
  /**
   * generate a new location object based on modalInput state values
   * to retrive dates, selected client and vehicle
   */
  const handleLocationObjectCreation = (priceParam: number) => {
    if (clientList) {
      const client: clientType[] = clientList.filter((client) => {
        return client.id == modalInput.clientID;
      });

      setLocationObj((prev) => {
        return {
          ...prev,
          id: randomNumber(),
          prix: priceParam,
          dateDebut: modalInput.date1,
          dateFin: modalInput.date2,
          client: {...client[0]},
          voiture: {...props.vehicle},
        };
      });
    }
  };

  // ---------------------------
  // update locationObj once the modalInput state has change to retrice the correct information
  // so the correct pricing  calculation based on selected dates
  useEffect(() => {
    handleLocationObjectCreation(rentalPriceCalculation(modalInput.date1, modalInput.date2, props.vehicle.prixJournee));
  }, [modalInput]);

  // ---------------------------
  /**
   * create the location object in the "data base / json server"
   * @param e button mouse click event
   */
  const handleModalvalidateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const currentprice = rentalPriceCalculation(modalInput.date1, modalInput.date2, props.vehicle.prixJournee);

    // check if the price is valid ( if not > 0 mean selected date arent correct )
    if (currentprice > 0) {
      dataAddLocation(locationObj);

      // patch rented vehicle to change aviability status
      props.dataPatchVehicle(props.vehicle.id, {disponible: !props.vehicle.disponible});

      props.handleModalState(e);
    } else {
      console.log("Erreur sur les dates, veuillez recommencer");
    }
  };

  // --------------------------------------------------------------------
  // --------------------------------------------------------------------
  return (
    <Fragment>
      {props.isModalOpen && (
        <section
          className="modal__backdrop"
          onClick={handleModalState}>
          {/* START MODAL CONTENT */}
          <section
            className="modal__content"
            onClick={ignoreClick}>
            <h2>Location de Véhicule</h2>
            <form className="modal__form">
              <div>
                <label htmlFor="date1"> Date de debut de Location : </label>
                <input
                  onChange={handleInputChange}
                  value={modalInput.date1}
                  name="date1"
                  id="date1"
                  type="date"
                  min={new Date().toLocaleDateString().split("/").reverse().join("-")}
                />
              </div>
              <div>
                <label htmlFor="date2"> Date de fin de Location : </label>
                <input
                  onChange={handleInputChange}
                  name="date2"
                  id="date2"
                  type="date"
                  value={modalInput.date2}
                  min={changeDate()}
                />
              </div>
              <div>
                <label htmlFor="clientSelectID"> Selectionner le client : </label>
                <select
                  onChange={handleInputChange}
                  name="clientID"
                  value={modalInput.clientID}
                  id="clientSelectID">
                  {clientList &&
                    clientList.map((client) => {
                      return (
                        <option
                          key={client.id}
                          value={client.id}>
                          {client.nom} {client.prenom}
                        </option>
                      );
                    })}
                </select>
              </div>
            </form>

            <div>
              <p> Prix de la location : </p>
              <p>
                {rentalPriceCalculation(modalInput.date1, modalInput.date2, props.vehicle.prixJournee) === 0
                  ? "Veuillez séléctionner des dates correct"
                  : rentalPriceCalculation(modalInput.date1, modalInput.date2, props.vehicle.prixJournee)}
              </p>
            </div>

            <div className="modal__buttons-container">
              <Button
                content={"valider"}
                extraCssClass={""}
                disabled={false}
                handleClick={handleModalvalidateButton}
              />
              <Button
                content={"Close"}
                extraCssClass={""}
                disabled={false}
                handleClick={handleModalState}
              />
            </div>
          </section>
          {/* END MODAL CONTENT */}
        </section>
      )}
    </Fragment>
  );
};
