const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");



const exphbs = require("express-handlebars");

const hbs = exphbs.create({ });


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/"));

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

