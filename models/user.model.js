const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
      },
    email: String,
    password: String
},
{
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema, 'users');

module.exports = { User };