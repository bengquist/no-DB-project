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
    if (typeof this.props.ingredients == "string") {
      var newIngredients = this.props.ingredients;
    } else {
      var newIngredients = this.props.ingredients.map((val, i) => {
        return <p key={i}>{val}</p>;
      });

      var newStrIngredients = this.props.ingredients.map((val, i) => {
        return { val };
      });
    }

    const completeDelete = () => {
      this.props.deleteRecipe(this.props.id);
    };

    const editToggle = () => {
      this.setState({ edit: !this.state.edit });
    };

    const inputToggle = ingredients => {
      this.setState({ input: ingredients });
    };

    const confirmEdit = () => {
      this.props.editRecipe(this.props.id, this.state.input);
      this.setState({ edit: !this.state.edit, input: "" });
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
              <strong>Calories:</strong>{" "}
              {typeof this.props.cal === "number"
                ? this.props.cal.toFixed(0)
                : this.props.cal}
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
            <Button clicked={editToggle}>
              {this.state.edit == false ? "Edit" : "Cancel"}
            </Button>
            <Button clicked={completeDelete}>Delete</Button>
          </div>
          <div className="info">
            <p>
              <strong>Calories:</strong>{" "}
              {typeof this.props.cal === "number"
                ? this.props.cal.toFixed(0)
                : this.props.cal}
            </p>
            <br />
            <p>
              <strong>Ingredients:</strong>
            </p>
            <textarea
              onChange={event => inputToggle(event.target.value)}
              className="ingredients"
              type="text"
            />
            <Button clicked={confirmEdit}>Confirm</Button>
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
