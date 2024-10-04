import mongoose, {Schema} from 'mongoose';

const commentSchema = new Schema({
    content: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    left: {type: Number, required: true},
    right: {type: Number, required: true},
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null}
}, {timestamps: true});
commentSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});
commentSchema.set('toObject', {virtuals: true});
commentSchema.set('toJSON', {virtuals: true});
const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;