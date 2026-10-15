import mongoose from 'mongoose';

export async function connectDatabase() {
  const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripmania';
  await mongoose.connect(connectionString);
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
}
