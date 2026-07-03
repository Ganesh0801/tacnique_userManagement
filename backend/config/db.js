import mongoose from 'mongoose';

/**
 * Opens a single shared Mongoose connection using the MONGO_URI env var.
 * Exits the process on failure so the app never runs in a half-connected state.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected...`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
