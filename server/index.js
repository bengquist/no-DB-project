const express = require("express");
const bodyParser = require("body-parser");
const cont = require("./controllers/controller.js");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.get("/api/recipes", cont.getRecipes);
app.get("/api/recipes/label", cont.getNewRecipes);
app.delete("/api/recipes/:id", cont.deleteRecipe);
app.put("/api/recipes/id", cont.updateRecipe);
app.post("/api/recipes", cont.addRecipe);

const port = 3001;
app.listen(port, () => console.log(`Listening on port:${port}`));
