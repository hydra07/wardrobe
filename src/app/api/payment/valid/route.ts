import roleRequire from '@/configs/middleware';
import { validPayment } from '@/services/payment.service';
import { NextRequest, NextResponse } from 'next/server';

export const POST = roleRequire(async (req: NextRequest) => {
  const { userId, orderCode, status, paymentLinkId } = await req.json();
  console.log(userId, orderCode, status, paymentLinkId);
  const isPayment = await validPayment(orderCode, paymentLinkId, status);
  if (isPayment) {
    return NextResponse.json({
      status: 200,
      message: 'Payment is valid',
    });
  }
  return NextResponse.json({
    status: 400,
    message: 'Payment is invalid',
  });
}, 'user');
