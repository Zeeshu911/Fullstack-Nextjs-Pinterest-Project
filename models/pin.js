import mongoose from "mongoose";

const pinSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    image: {
      url: String,
    },
    likes: [
      {
        user: String,
      },
    ],
    comments: [
      {
        user: String,
        profileImage: String,
        comment: String,
        commentedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Pin || mongoose.model("Pin", pinSchema);
