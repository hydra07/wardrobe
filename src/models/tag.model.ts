import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
export default Tag;
