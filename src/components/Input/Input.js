import React from "react";
import "./Input.css";

const Input = props => {
  return (
    <input
      placeholder={props.words}
      value={props.value}
      type={props.type}
      onChange={event => props.changed(event.target.value)}
    />
  );
};

export default Input;
