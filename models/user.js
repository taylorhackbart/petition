const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
  activities: {type: String, required: true},
  link: {type: String, required: false},
  imageUrl: [{
    link: {type: String}
  }],

  userCreated: {
    type: Date,
    default: Date.now
  }
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
