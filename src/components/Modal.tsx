import React, {ChangeEvent, Fragment, useEffect, useState} from "react";
import {dataServices} from "../services/dataServices";
import {randomNumber} from "../services/tools";
import {clientType} from "../type/clientType";
import {vehicleType} from "../type/vehicleType";
import {locationType} from "../type/locationType";
import {Button} from "./Button";

type propsType = {
  isModalOpen: boolean;
  vehicle: vehicleType;
  handleModalState: Function;
};

const URLclient: string = "http://localhost:3000/clients";
const URLlocation: string = "http://localhost:3000/location";

export const Modal = (props: propsType) => {
  const [clientList, setClientList] = useState<clientType[]>();

  const [locationObj, setLocationObj] = useState<locationType>({
    id: 0,
    dateDebut: "",
    dateFin: "",
    prix: 0,
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
    prix: 0,
    clientID: 0,
  });

  // --------------------------------------------------------------------
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
    dataServices.fetchData(URLclient).then((data) => setClientList(data));
  };
  /**
   * retrice data send from Clientinput, insert an ID and pass to to the REST POST
   * dataService method to create a client
   * @param data
   */
  const dataAddLocation = (data: locationType) => {
    dataServices.postData(URLlocation, data);
  };
  // --------------------------------------------------------------------
  // MODAL STATE HANDLING
  /**
   *  send the mouse event to parent page
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
  // DATE HANDLING

  useEffect(() => {
    console.log(modalInput);
  }, [modalInput]);

  //

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

    handleLocationObjectCreation();
  };

  // --------------------------------------------------------------------
  // RENTAL VALIDATION:

  /**
   *  Generate price depending of number of rental day
   * Check if date selection arent incorrect before generating the price
   * @returns price
   */
  const rentalPriceCalculation = () => {
    const dayConvert: number = 1000 * 60 * 60 * 24;
    const dateStart: Date = new Date(modalInput.date1);
    const dateEnd: Date = new Date(modalInput.date2);

    let price: number = 0;
    let getDayCount: number;

    getDayCount = Math.ceil(dateEnd.getTime() - dateStart.getTime()) / dayConvert;

    if (getDayCount > 0) {
      price = getDayCount * props.vehicle.prixJournee;
    } else {
      console.log("les dates ne sont pas correct ");
    }
    return price;
  };

  /**
   * generate location object based on
   * if the date selection so pricing is correct
   */
  const handleLocationObjectCreation = () => {
    if (clientList) {
      const client = clientList.filter((client) => {
        return client.id == modalInput.clientID;
      });
      setLocationObj((prev) => {
        return {
          ...prev,
          id: randomNumber(),
          prix: rentalPriceCalculation() === 0 ? 0 : rentalPriceCalculation(),
          dateDebut: modalInput.date1,
          dateFin: modalInput.date2,
          client: {...client[0]},
          voiture: {...props.vehicle},
        };
      });
    }
  };

  /**
   * create the location object in the "data base / json server"
   * @param e button mouse click event
   */
  const handledRental = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (locationObj.prix === 0 || locationObj.prix < 0) {
      console.log("Erreur sur les dates, veuillez recommencer");
    } else {
      dataAddLocation(locationObj);
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
              <p> {rentalPriceCalculation() === 0 ? "Dates incorrects" : rentalPriceCalculation()} </p>
            </div>

            <div className="modal__buttons-container">
              <Button
                content={"valider"}
                extraCssClass={""}
                disabled={false}
                handleClick={handledRental}
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
