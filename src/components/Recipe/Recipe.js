import React, { Component } from "react";
import Button from "../Button/Button.js";
import "./Recipe.css";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      edit: false
    };
  }

  render() {
    let newIngredients = this.props.ingredients.map((val, i) => {
      return <p key={i}>{val}</p>;
    });

    let newStrIngredients = this.props.ingredients.map((val, i) => {
      return val + "\n";
    });

    const completeDelete = () => {
      this.props.deleteRecipe(this.props.id);
    };

    const editToggle = () => {
      this.setState({ edit: !this.state.edit });
    };

    const inputToggle = ingredients => {
      this.setState({ input: ingredients });
    };

    if (!this.state.edit) {
      return (
        <div key={this.props.id} className="recipe">
          <div className="heading">
            <h1>{this.props.name}</h1>
            <Button clicked={editToggle}>Edit</Button>
            <Button clicked={completeDelete}>Delete</Button>
          </div>
          <div className="info">
            <p>
              <strong>Calories:</strong> {this.props.cal.toFixed(0)}
            </p>
            <br />
            <p>
              <strong>Ingredients:</strong>
            </p>
            {newIngredients}
          </div>
          <a href={this.props.url} target="_blank">
            <img src={this.props.img} alt="food" />
          </a>
        </div>
      );
    } else {
      return (
        <div key={this.props.id} className="recipe">
          <div className="heading">
            <h1>{this.props.name}</h1>
            <Button clicked={editToggle}>Edit</Button>
            <Button clicked={completeDelete}>Delete</Button>
          </div>
          <div className="info">
            <p>
              <strong>Calories:</strong> {this.props.cal.toFixed(0)}
            </p>
            <br />
            <p>
              <strong>Ingredients:</strong>
            </p>
            <textarea
              onChange={event => console.log(event.target.value)}
              className="ingredients"
              value={this.state.value}
            />
          </div>
          <a href={this.props.url} target="_blank">
            <img src={this.props.img} alt="food" />
          </a>
        </div>
      );
    }
  }
}

export default Recipe;
