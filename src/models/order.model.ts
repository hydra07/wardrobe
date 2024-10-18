import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  orderCode: { type: Number, require: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'PENDING' },
  paymentLinkId: { type: String },
});
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
