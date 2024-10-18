import roleRequire from '@/configs/middleware';
import payment from '@/services/payment.service';
import { NextRequest, NextResponse } from 'next/server';
// export const GET = async (req: NextRequest) => {
//   const body = {
//     orderCode: Number(String(Date.now()).slice(-6)),
//     amount: 5000,
//     description: 'Thanh toan don hang',
//     items: [
//       {
//         name: 'Mì tôm Hảo Hảo ly',
//         quantity: 1,
//         price: 1000,
//       },
//     ],
//     returnUrl: `${process.env.NEXTAUTH_URL}/result`,
//     cancelUrl: `${process.env.NEXTAUTH_URL}/result`,
//   };

//   try {
//     const paymentLinkResponse = await payOS.createPaymentLink(body);
//     // return NextResponse.json(
//     //   {
//     //     paymentLinkResponse,
//     //   },
//     //   { status: 200 },
//     // );
//     return NextResponse.redirect(paymentLinkResponse.checkoutUrl);
//     // return new NextResponse(JSON.stringify(paymentLinkResponse))
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: 'Something went error',
//       },
//       { status: 404 },
//     );
//   }
// };
export const POST = roleRequire(async (req: NextRequest) => {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json(
      { status: 400, message: 'User ID is required' },
      { status: 400 },
    );
  }
  const paymentLinkResponse = await payment(userId);
  if (typeof paymentLinkResponse === 'string')
    return NextResponse.json(paymentLinkResponse);
  return NextResponse.json(paymentLinkResponse?.checkoutUrl);
}, 'user');

//http://localhost:3000/result?code=00&id=fcda30b3d99841b5805134cb676cc0be&cancel=false&status=PAID&orderCode=73411
