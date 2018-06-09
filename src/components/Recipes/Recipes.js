import React, { Component } from "react";
import axios from "axios";
import Recipe from "../Recipe/Recipe";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Recipes.css";

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
      input: "",
      labal: "",
      ingredientLines: "",
      calories: ""
    };
  }

  componentDidMount() {
    axios.get("/api/recipes").then(response => {
      console.log(response.data);
      this.setState({ recipes: response.data });
    });
  }

  inputHandler = recipe => {
    this.setState({ input: recipe });
  };

  labelHandler = label => {
    this.setState({ label: label });
  };

  ingredientHandler = ingredient => {
    this.setState({ ingredientLines: ingredient });
  };

  calorieHandler = calories => {
    this.setState({ calories: calories });
  };

  searchRecipe = () => {
    if (this.state.input) {
      axios
        .get(`/api/recipes/label?label=${this.state.input}`)
        .then(response => this.setState({ recipes: response.data.hits }));
    }
  };

  deleteRecipe = index => {
    axios
      .delete(`/api/recipes/id?id=${index}`)
      .then(response => this.setState({ recipes: response.data }));
  };

  editRecipe = (index, text) => {
    axios
      .put(`/api/recipes/id?id=${index}`, { text })
      .then(response => this.setState({ recipes: response.data }));
  };

  postRecipe = () => {
    if (this.state.label && this.state.ingredientLines && this.state.calories) {
      axios
        .post(`/api/recipes`, {
          label: this.state.label,
          ingredientLines: this.state.ingredientLines,
          calories: this.state.calories
        })
        .then(response => {
          this.setState({ recipes: response.data });
        });
    }
    this.setState({ label: "", ingredientLines: "", calories: "" });
  };

  render() {
    if (this.state.recipes) {
      console.log(this.state.recipes);
      var recipesDisplay = this.state.recipes.map((val, i) => {
        return (
          <Recipe
            key={val.id}
            id={i}
            name={val.recipe.label}
            img={val.recipe.image}
            url={val.recipe.url}
            cal={val.recipe.calories}
            ingredients={val.recipe.ingredientLines}
            deleteRecipe={this.deleteRecipe}
            editRecipe={this.editRecipe}
          />
        );
      });
    }

    return (
      <div>
        <Input changed={this.inputHandler} />
        <Button clicked={this.searchRecipe}>Search</Button>
        <div className="post">
          <h4>Name: </h4>
          <Input value={this.state.label} changed={this.labelHandler} />
          <h4>Ingredients: </h4>
          <Input
            value={this.state.ingredientLines}
            changed={this.ingredientHandler}
          />
          <h4>Calories: </h4>
          <Input
            value={this.state.calories}
            type="number"
            changed={this.calorieHandler}
          />
          <Button clicked={this.postRecipe}>Add</Button>
        </div>
        {recipesDisplay}
      </div>
    );
  }
}

export default Recipes;
