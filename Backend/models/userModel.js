import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password from query results by default
  },
  socketID: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

export default User;