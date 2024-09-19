import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema(
  {
    //--provider---
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    //-------------
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    role: {
      type: [String],
      required: true,
      default: ['user'],
    },
    //Photo of user
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
    ],
    //------premium--------
    premiumStatus: {
      isPremium: { type: Boolean, default: false },
      expiresAt: { type: Date, default: null },
    },
    //TODO: add current plant & premium history
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
