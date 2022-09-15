const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const productRoute = require("./routes/product.js");
const fornecedorRoute = require("./routes/fornecedor.js")
const path = require("path");

//config swagger 
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpecs = {
  definition : {
    openapi: "3.0.0",
    info: {
      title: "node Petshop API",
      version: "1.0.0"
    },
    server: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js" )}`],
}

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use("/api", productRoute);
app.use("/api", fornecedorRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerSpecs)));

// Route
app.get("/", (req, res) => {
    res.send("Bem-vindo to my API");
  });

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));
// server connection
  app.listen(port, () => console.log("Server listening to", port));