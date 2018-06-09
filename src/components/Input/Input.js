import React from "react";
import "./Input.css";

const Input = props => {
  return <input onChange={event => props.changed(event.target.value)} />;
};

export default Input;
