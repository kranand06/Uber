import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isEmail: true, // Validate email format
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password from query results by default
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  socketID: {
    type: String,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'unavailable',
  },
  vehicle: {
    color : {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 3 characters long'],
    },
    model : {
      type: String,
      required: true,
      minlength: [3, 'Model must be at least 3 characters long'],
    },
    licensePlate : {
      type: String,
      required: true,
      minlength: [9, 'License plate must be at least 9 characters long'],
    },
    capacity : {
      type: Number,
      required: true,
      min: 1,
    },
    type : {
      type: String,
      required: true,
      enum: ['car', 'bike', 'auto'],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,    },
  },
});

const Driver = mongoose.model("driver", driverSchema);

export default Driver;