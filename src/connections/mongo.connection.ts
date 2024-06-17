import mongoose from 'mongoose';
import { properties } from '../config/properties';

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(properties.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
