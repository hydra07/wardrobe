import mongoose from 'mongoose';
const DATABASENAME = process.env.DATABASENAME || 'wardrobe';
export default async function initializeDatabase() {
  await mongoose
    .connect(`mongodb://localhost:27017/${DATABASENAME}`)
    .then(() => console.log('💓 Connected to MongoDB'))
    .catch((err) => console.error('💔 Failed to connect to MongoDB', err));
}
