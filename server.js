const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
     }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));