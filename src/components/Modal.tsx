import React, {ChangeEvent, Fragment, useEffect, useState} from "react";
import {Button} from "./Button";

type propsType = {
  isModalOpen: boolean;
  handleModalState: Function;
};

export const Modal = (props: propsType) => {
  const changeDate = (): string => {
    const dateNowArray = new Date().toLocaleDateString().split("/");
    dateNowArray[0] = String(+dateNowArray[0] + 1);
    return dateNowArray.reverse().join("-");
  };

  // --------------------------------------------------------------------
  const [modalInput, setModalInput] = useState({
    date1: new Date().toLocaleDateString().split("/").reverse().join("-"),
    date2: changeDate(),
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
  const handleModalState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.handleModalState(e);
  };

  const ignoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // remove prevent default otherwise the date click do not work
    //e.preventDefault();
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
            <form className="modal__form">
              <label htmlFor="date1"> Date1 : </label>

              <input
                onChange={handleInputChange}
                value={modalInput.date1}
                name="date1"
                id="date1"
                type="date"
                min={new Date().toLocaleDateString().split("/").reverse().join("-")}
              />
              <label htmlFor="date2"> Date2 : </label>
              <input
                onChange={handleInputChange}
                name="date2"
                id="date2"
                type="date"
                value={modalInput.date2}
                min={changeDate()}
              />
              <select
                onChange={handleInputChange}
                name="selectInput"
                value={modalInput.selectInput}
                id="">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </form>

            <Button
              content={"Close"}
              extraCssClass={""}
              handleClick={handleModalState}
            />
          </section>
          {/* END MODAL CONTENT */}
        </section>
      )}
    </Fragment>
  );
};
