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
      calories: "",
      newImg: [],
      newImage: "",
      counter: 0
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
          this.getPhoto();
          this.setState({ label: "", ingredientLines: "", calories: "" });
        });
    }
  };

  getPhoto = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${
          this.state.label
        }&client_id=80b9c1dd9ec3493dd259267b42bb9e0d637606ba6956cfaa08bc3c90a4e62d46`
      )
      .then(response => {
        const image = response.data.results[0].urls.raw;
        var newArr = [...this.state.newImg, image] || [image];
        const newImage = newArr[this.state.counter];
        this.setState({
          newImg: newArr,
          counter: this.state.counter + 1,
          newImage: newImage
        });
      });
  };

  render() {
    if (this.state.recipes) {
      var recipesDisplay = this.state.recipes.map((val, i) => {
        return (
          <Recipe
            key={val.id}
            id={i}
            name={val.recipe.label}
            img={val.recipe.image}
            url={val.recipe.url}
            newImg={this.state.newImage}
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
        <div className="post">
          <div>
            <h4>Name: </h4>
            <Input value={this.state.label} changed={this.labelHandler} />
          </div>
          <div>
            <h4>Ingredients: </h4>
            <Input
              value={this.state.ingredientLines}
              changed={this.ingredientHandler}
            />
          </div>
          <div>
            <h4>Calories: </h4>
            <Input
              value={this.state.calories}
              type="number"
              changed={this.calorieHandler}
            />
          </div>

          <Button clicked={this.postRecipe}>Add</Button>
          <div>
            <Input changed={this.inputHandler} />
            <Button clicked={this.searchRecipe}>Search</Button>
          </div>
        </div>
        {recipesDisplay}
      </div>
    );
  }
}

export default Recipes;
