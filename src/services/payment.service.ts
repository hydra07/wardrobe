'use strict';

import payOS from '@/configs/payos.config';
import Order from '@/models/order.model';
import User from '@/models/user.model';
import { upgradeUserToPremium } from './user.service';
export async function _payment(data: any) {
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: 10000,
    description: 'Thanh toan don hang',
    items: [
      {
        name: `Premium 1 month`,
        quantity: 1,
        price: 10000,
      },
    ],
    returnUrl: `${'http://localhost:3000'}/resultPayment`,
    cancelUrl: `${'http://localhost:3000'}/resultPayment`,
  };
  try {
    console.log(body);
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    return paymentLinkResponse;
    // console.log(JSON.stringify(paymentLinkResponse));
    // return JSON.stringify(paymentLinkResponse);
    // return new NextResponse(JSON.stringify(paymentLinkResponse))
  } catch (error) {
    console.log('loi nek ', error);
    return null;
  }
}

export default async function payment(userId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.premiumStatus.isPremium == true) {
    return 'isPremium';
  }
  const order = new Order({
    orderCode: Number(String(Date.now()).slice(-6)),
    userId: userId,
  });

  const body = {
    orderCode: order.orderCode,
    amount: 20000,
    description: 'Thanh toan don hang',
    items: [
      {
        name: `Premium 1 month`,
        quantity: 1,
        price: 20000,
      },
    ],
    returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL as string}/resultPayment`,
    cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL as string}/resultPayment`,
  };
  try {
    console.log(body);
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    order.paymentLinkId = paymentLinkResponse.paymentLinkId;
    console.log(JSON.stringify(paymentLinkResponse));
    const savedOrder = await order.save();
    return paymentLinkResponse;
  } catch (error) {
    console.log('loi nek ', error);
    return null;
  }
}

export async function validPayment(
  orderCode: number,
  paymentLinkId: string,
  status: string,
) {
  const order = await Order.findOne({ orderCode: orderCode });
  if (!order) {
    throw new Error('Order not found');
  }
  if (order.paymentLinkId !== paymentLinkId) {
    throw new Error('Payment link not match');
  }
  if (status === 'PAID') {
    const user = await upgradeUserToPremium(order.userId);
    if (!user) {
      throw new Error('Error upgrading user to premium');
    }
    // Update order status
    order.status = 'PAID';
    await Order.updateOne({ _id: order._id }, order);
    return true;
  }
  if (status === 'CANCELLED') {
    order.status = 'CANCELLED';
    await Order.updateOne({ _id: order._id }, order);
    return false;
  }
  return false;
}
