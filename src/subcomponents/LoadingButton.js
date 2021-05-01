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
    disabled = false,
    size='md'
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

  const sizeClasses = () => {
    switch (size){
      case 'lg':
        return 'px-6 py-3'
      case 'md':
        return 'px-4 py-2'
      case 'sm':
        return 'px-2 py-1'
      default: 
        return 'px-4 py-2'
    }
  }

  const loadingClass = () => {
    return (loading) ? "" : "hidden"
  };

  const buttonClass = () => {
    return (loading || disabled) ? "cursor-not-allowed pointer-events-none" : "" 
  };

  return(
    <span className="inline-flex rounded-md shadow-sm">
      <button 
        className={`${bgColor()} ${bgHover()} disabled:opacity-50 transition duration-300 inline-flex items-center ${sizeClasses()} border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 focus:outline-none active:bg-rose-700 transition ease-in-out duration-150 ${buttonClass()}`}
        disabled={loading || disabled}
        onClick={onClick}
      >
        <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${loadingClass()}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {buttonVal}
      </button>
      {renderErrors()}
    </span>
  )

}
