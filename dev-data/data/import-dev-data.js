const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tours = require('./../../models/Tour');

const toursToImport = JSON.parse(
  fs.readFileSync('./tours-simple.json', 'utf-8')
);

dotenv.config({ path: './../../config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('connection successful');
    deleteAllTours();
    createNewTours(toursToImport);
  })
  .catch((err) => {
    console.log('ERROR: ' + err);
  });

const deleteAllTours = async () => {
  try {
    isDeleted = await Tour.deleteMany();
    if (isDeleted) {
      console.log('Tours Deleted successfully');
    }
  } catch (err) {
    console.log('Error: ' + err);
  }
};

const createNewTours = async () => {
  try {
    isAdded = await Tour.create(toursToImport);
    if (isAdded) {
      console.log('Tours added successfully');
    }
  } catch (err) {
    console.log('Error: ' + err);
  }
};
