import React, { Component } from "react";
import axios from "axios";
import Recipe from "../Recipe/Recipe";
import Input from "../Input/Input";
import Button from "../Button/Button";

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
      input: ""
    };
  }

  componentDidMount() {
    axios
      .get("/api/recipes")
      .then(response => this.setState({ recipes: response.data }));
  }

  inputHandler = recipe => {
    this.setState({ input: recipe });
  };

  searchRecipe = () => {
    axios
      .get(`/api/recipes/label?label=${this.state.input}`)
      .then(response => this.setState({ recipes: response.data.hits }));
  };

  deleteRecipe = index => {
    axios
      .delete(`/api/recipes/id?id=${index}`)
      .then(response => this.setState({ recipes: response.data }));
  };

  render() {
    if (this.state.recipes) {
      var recipesDisplay = this.state.recipes.map((val, i) => {
        return (
          <Recipe
            key={val.recipe.id}
            id={i}
            name={val.recipe.label}
            img={val.recipe.image}
            url={val.recipe.url}
            cal={val.recipe.calories}
            ingredients={val.recipe.ingredientLines}
            deleteRecipe={this.deleteRecipe}
          />
        );
      });
    }

    return (
      <div>
        <Input changed={this.inputHandler} />
        <Button clicked={this.searchRecipe}>Search</Button>
        {recipesDisplay}
      </div>
    );
  }
}

export default Recipes;
