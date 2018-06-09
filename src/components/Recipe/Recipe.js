import React from "react";
import Button from "../Button/Button.js";
import "./Recipe.css";

const Recipe = props => {
  let newIngredients = props.ingredients.map((val, i) => {
    return <p key={i}>{val}</p>;
  });

  const completeDelete = () => {
    props.deleteRecipe(props.id);
  };

  return (
    <div key={props.id} className="recipe">
      <div className="heading">
        <h1>{props.name}</h1>
        <Button>Edit</Button>
        <Button clicked={completeDelete}>Delete</Button>
      </div>
      <div className="info">
        <p>
          <strong>Calories:</strong> {props.cal.toFixed(0)}
        </p>
        <br />
        <p>
          <strong>Ingredients:</strong>
        </p>
        {newIngredients}
      </div>
      <a href={props.url} target="_blank">
        <img src={props.img} alt="food" />
      </a>
    </div>
  );
};

export default Recipe;
