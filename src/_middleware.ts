// // 'use server';
// import { NextRequest, NextResponse } from 'next/server';
// import { ensureDbConnected } from './configs/database';
// import AuthService from './services/auth.service';

// /**
//  * Hàm này sẽ dùng để check xem
//  * @param request
//  * @returns
//  *
//  */
// export async function authMiddleware(request: NextRequest) {}

// export async function middleware(request: NextRequest) {
//   try {
//     await ensureDbConnected();
//     const authHeader = request.headers.get('Authorization');
//     if (!authHeader) {
//       return new NextResponse(null, { status: 401 });
//     }
//     // Extract the token from the Authorization header
//     const token = authHeader.replace(/^Bearer\s/, '');
//     if (!token) {
//       return new NextResponse(null, { status: 401 });
//     }
//     console.log('token - from middleware', token);
//     const authService = new AuthService();
//     const requestHeaders = new Headers(request.headers);
//     try {
//       const { userId, role } = await authService.verifyToken(token);
//       if (!userId) {
//         return new NextResponse(null, { status: 401 });
//       }
//       requestHeaders.set('x-user-id', userId);
//       // requestHeaders.set('x-user-role', role);
//     } catch (error) {
//       // Log the error or handle it as needed
//       return new NextResponse(null, { status: 401 });
//     }
//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });
//   } catch (error) {
//     console.error('Failed to connect to the database:', error);
//     return new NextResponse(null, { status: 500 });
//   }
// }

// export const config = {
//   matcher: ['/api/protected/:path*', '/wardrobe'],
// };
