const axios = require("axios");

let recipes = [];
let id = 0;

axios
  .get(
    "https://api.edamam.com/search?q=salad&app_id=999bb820&app_key=647bc9a8771608ce360fafc71fa5e047&from=0&to=10"
  )
  .then(response => {
    recipes = response.data.hits;
    recipes.forEach(val => {
      val.id = id;
      id++;
    });
  });

const getRecipes = (req, res) => {
  res.status(200).send(recipes);
};

const getNewRecipes = (req, res) => {
  axios
    .get(
      `https://api.edamam.com/search?q=${
        req.query.label
      }&app_id=999bb820&app_key=647bc9a8771608ce360fafc71fa5e047&from=0&to=10`
    )
    .then(response => {
      recipes = response.data;
      res.status(200).send(recipes);
    });
};

const deleteRecipe = (req, res) => {
  let id = req.query.id;
  recipes.splice(id, 1);
  res.status(200).send(recipes);
};

module.exports = {
  getRecipes,
  getNewRecipes,
  deleteRecipe
};
