import React from "react";
import ErrorText from "./ErrorText";
import { hash } from "../helpers/functions";

export default function Submit(props) {
  const { value, onClick = () => {}, type = "primary", errors = [], mt = "mt-0" } = props;

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
    return (
      <div>
        {errors.map((e) => {
          return <ErrorText value={e} key={hash(e)} />;
        })}
      </div>
    );
  };

  return (
    <>
      <button
        className={`${bgColor()} transition duration-300 ${bgHover()} text-white font-bold py-2 px-4 ${mt} rounded focus:outline-none`}
        onClick={onClick}
      >
        {value}
      </button>
      {renderErrors()}
    </>
  );
}
