import React from "react";
import ErrorText from "./ErrorText";
import { hash } from "../helpers/functions";

export default function Submit(props) {
  const { 
    value, 
    onClick = () => {}, 
    type = "primary",
    btnType="submit",
    errors = [], 
    mt = "mt-0" 
  } = props;

  const bgColor = () => {
    switch (type) {
      case "primary":
        return "bg-tertiary";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-tertiary";
    }
  };

  const bgHover = () => {
    switch (type) {
      case "primary":
        return "hover:bg-terdark";
      case "danger":
        return "hover:bg-red-800";
      default:
        return "hover:bg-terdark";
    }
  };

  const renderErrors = () => {
    return errors.length > 0 ? (
      <div>
        {errors.map((e) => {
          return <ErrorText value={e} key={hash(e)} />;
        })}
      </div>
    ) : null;
  };

  return (
    <>
      <button
        className={`${bgColor()} transition duration-300 font-thin ${bgHover()} text-white font-bold py-2 px-4 ${mt} rounded focus:outline-none`}
        onClick={onClick}
        type={btnType}
      >
        {value}
      </button>
      {renderErrors()}
    </>
  );
}
