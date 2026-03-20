import mongoose from "mongoose";

const blockedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Token expires after 24 hours
  },
});

const BlockedToken = mongoose.model("BlockedToken", blockedTokenSchema);

export default BlockedToken;