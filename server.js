const express = require("express");
const mongoose = require("mongoose");

const config = require('config');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = config.get('mongoURI');

mongoose
  .connect(
    db,
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
     }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


  app.use('/api/user', require('./routes/api/user'));
  app.use('/api/events', require('./routes/api/events'));
  app.use('/api/auth', require('./routes/api/auth'));

  const port = 6000;
  app.listen(port, () => console.log(`Server running on port ${port}`));