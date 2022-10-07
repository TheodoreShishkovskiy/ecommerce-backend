const express = require('express');
const routes = require('./routes');
// import sequelize connection
// This variable will allow sequelize to import connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// This will all of the Models to sequelize to the database, then the server wil turn on
sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
})});
