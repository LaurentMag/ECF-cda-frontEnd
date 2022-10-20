import React, {ChangeEvent, Fragment, useEffect, useState} from "react";
import {dataServices} from "../services/dataServices";
import {clientType} from "../type/clientType";
import {Button} from "./Button";

type propsType = {
  isModalOpen: boolean;
  handleModalState: Function;
};

const URLclient: string = "http://localhost:3000/clients";

export const Modal = (props: propsType) => {
  const [clientList, setClientList] = useState<clientType[]>();
  /**
   * useEffect used to trigger a data fetch, only the first component is created.
   */
  useEffect(() => {
    dataFetch();
  }, []);

  // ----------------------------------------------------------------------------
  /**
   * Fetch data using dataservices method, then set data in the react state
   */
  const dataFetch = () => {
    dataServices.fetchData(URLclient).then((data) => setClientList(data));
  };

  // --------------------------------------------------------------------
  // DATE HANDLING
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
    date1: "",
    date2: "",
    selectInput: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setModalInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // --------------------------------------------------------------------
  // RENTAL VALIDATION:
  const handledRental = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // --------------------------------------------------------------------
  // MODAL HANDLING
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
                  name="selectInput"
                  value={modalInput.selectInput}
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
              <p> -somme- </p>
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
