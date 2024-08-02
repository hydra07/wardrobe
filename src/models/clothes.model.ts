import mongoose, { Schema } from 'mongoose';
import Tag from './tag.model';

//init tag model
const tag = Tag;

const clothesSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  { timestamps: true },
);

const Clothes =
  mongoose.models.Clothes || mongoose.model('Clothes', clothesSchema);
export default Clothes;
