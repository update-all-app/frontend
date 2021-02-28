import React from "react";
import { hash } from "../helpers/functions";
import ErrorText from "./ErrorText";
import Label from "./Label";
export default function Input(props) {
  const {
    placeholder,
    value,
    onChange,
    name = "select",
    errors = [],
    id = null,
    onFocus = () => {},
    disabled = false,
    required = true,
    mb = "mb-12",
    display = "block",
    w = "w-full",
    label = null,
    options = ["Default"],
  } = props;

  const propOrEmptyString = (someProp) => {
    return !!someProp ? someProp : "";
  };

  const propOrFirstOption = (someProp) => {
    return !!someProp ? someProp : options[0];
  };

  const renderErrors = () => {
    return errors.map((e) => {
      return <ErrorText value={e} key={hash(e)} />;
    });
  };

  const renderLabel = () => {
    if (label === null) {
      return;
    } else {
      return <Label forLabel={id} value={label} />;
    }
  };

  const renderOptions = () => {
    return options.map((opt) => {
      return (
        <option value={opt} key={hash(opt)}>
          {opt}
        </option>
      );
    });
  };

  return (
    <div className={`${mb} w-full ${display}`}>
      {renderLabel()}
      <select
        id={id}
        className={`${w} custom-input h-10 px-3 transition duration-300 text-base text-gray-700 placeholder-gray-400 border-b-2 focus:border-primary focus:border-b-2 focus:outline-none`}
        name={name}
        placeholder={propOrEmptyString(placeholder)}
        value={propOrFirstOption(value)}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        onFocus={onFocus}
        disabled={disabled}
      >
        {renderOptions()}
      </select>
      {renderErrors()}
    </div>
  );
}
