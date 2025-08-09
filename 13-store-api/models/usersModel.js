const mongoose = require('mongoose');

// const s = new mongoose.Schema({
//   _id: Number,
//   name: String,
//   age: Number,
//   email: String,
//   address: {
//     city: String,
//     zip: String,
//   },
//   hobbies: [String],
//   orders: [Object]
// })
const schema = new mongoose.Schema({_id: Number}, {strict: false});
const Users = mongoose.model("users", schema);

// Users.find({
//   // ? get doc where the hobbies array contains 'reading' and 'yoga' ->
//   // hobbies: {$all: ["reading", "yoga"]}
//   // ? elemMatch ->
//   // $and: [
//   //   {results: {$exists: true}},
//   //   {results: {$elemMatch: {$gt: 80, $lt: 90}}}
//   // ]
//   // results: {$elemMatch: {$lt: 90, $gt: 80}}
//   // orders: {$elemMatch: {item: 'Laptop'}}
//   // ? size -> 
//   // hobbies: {$size: 3}
//   orders: {$size: 3}


//   })
//   .then(users => console.log(users.toString()))
//   .catch(err => console.log(err));

module.exports = Users;



