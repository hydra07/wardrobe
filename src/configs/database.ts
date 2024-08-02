import mongoose from 'mongoose';

const DATABASENAME = process.env.DATABASENAME || 'wardrobe';
const MONGODB_URI = `mongodb://localhost:27017/${DATABASENAME}`;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface CachedConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('💓 Connected to MongoDB');
        return mongoose.connection;
      })
      .catch((error) => {
        console.error('💔 Failed to connect to MongoDB', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export function isConnected(): boolean {
  return cached.conn !== null && cached.conn.readyState === 1;
}

export async function ensureDbConnected(): Promise<void> {
  if (!isConnected()) {
    await dbConnect();
  }
}

export default dbConnect;
