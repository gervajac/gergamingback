const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name"],
    minLength: [1, "Full name should be atleast 1 characters long"],
    maxLength: [30, "Full name should be less than 30 characters"],
  },
  surname: {
    type: String,
    required: [true, "Surname"],
    minLength: [1, "Full name should be atleast 1 characters long"],
    maxLength: [30, "Full name should be less than 30 characters"],
  },
  adress: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  }
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("user", UserSchema);
