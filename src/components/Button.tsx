import React from "react";

type propsType = {
  content: any;
  extraCssClass: string;
  handleClick: Function;
  disabled: boolean;
};

export const Button = (props: propsType) => {
  /**
   * mouse handleClick propaging the click event to the parent to invoke the desired function
   * @param e mouse event, on button click
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // leave prevent default to keep the "submit effect in form"
    //e.preventDefault();
    props.handleClick(e);
  };

  return (
    <button
      className={`general-button ${props.extraCssClass}`}
      onClick={handleClick}
      disabled={props.disabled}>
      {props.content}
    </button>
  );
};
