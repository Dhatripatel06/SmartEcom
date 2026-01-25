import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './Product';

export interface IOrderProduct {
  productId: mongoose.Types.ObjectId | IProduct;
  quantity: number;
}

export interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  products: IOrderProduct[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative'],
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
