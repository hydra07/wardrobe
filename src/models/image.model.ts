import mongoose, { Schema } from 'mongoose';

const imageSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['avatar', 'clother', 'other'],
      default: 'other',
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'onModel',
    },
    onModel: {
      type: String,
      enum: ['User', 'Clothes'],
    },
  },
  { timestamps: true }
);

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);
export default Image;