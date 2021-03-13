import React from "react";
import ErrorText from "./ErrorText";
import { hash } from "../helpers/functions";

export default function LoadingButton(props) {
  const {
    value,
    onClick,
    type = "primary",
    loading = false,
    errors = [],
    mt = "mt-0",
    loadingValue = null,
    disabled = false
  } = props;

  const loadingVal = !!loadingValue ? loadingValue : value;
  const buttonVal = loading ? loadingVal : value;

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

  const loadingClass = () => {
    return (loading) ? "" : "hidden";
  };

  const buttonClass = () => {
    return (loading || disabled) ? "pointer-events-none" : "";
  };

  return (
    <>
      <button
        className={`${bgColor()} ${buttonClass()} disabled:opacity-50 transition duration-300 ${bgHover()} text-white font-bold py-2 px-4 ${mt} rounded focus:outline-none`}
        onClick={onClick}
        disabled={loading}
      >
        <div className="flex flex-row">
          <svg
            className={`animate-spin h-5 w-5 mr-3 mt-px ${loadingClass()}`}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              style={{ strokeDashoffset: 75, strokeDasharray: 60 }}
              stroke="white"
              strokeWidth="2"
            ></circle>
          </svg>
          {buttonVal}
        </div>
      </button>
      {renderErrors()}
    </>
  );
}
