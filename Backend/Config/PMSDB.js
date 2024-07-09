import mongoose from "mongoose";

const PMSDB = async () => {
  const DBURI = process.env.MONGO_URI;
  try {
    await mongoose.connect(DBURI);
    console.log("App connected to PMSDB".yellow);
  } catch (error) {
    console.log(error);
  }
};

export default PMSDB;
