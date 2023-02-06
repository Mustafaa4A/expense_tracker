import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/expensedb');

mongoose.connection.once('connected', () => {
  console.log('mongodb connected successfully');
});


mongoose.connection.on('error', (erroor) => {
  throw erroor;
});