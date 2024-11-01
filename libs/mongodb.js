import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log(`Some error occured while connecting to database: ${error}`);
  }
};

export default connectToDB