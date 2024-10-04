import AuthService from '@/services/auth.service';
import console from 'console';
import { NextRequest, NextResponse } from 'next/server';

type Handler<T> = T extends { req: infer R }
  ? (req: R, params:any) => Promise<NextResponse>
  : never;

/**
 * Hàm này dùng để check xem có đăng nhập hay không, và trả về các thông tin như userId, role.
 * @param req
 * @returns NextRequest hoặc NextResponse (nếu có lỗi)
 */
async function authMiddleware(
  req: NextRequest,
): Promise<NextResponse | NextRequest> {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new NextResponse('Authorization header missing', { status: 401 });
    }

    // Extract the token from the Authorization header
    const token = authHeader.replace(/^Bearer\s/, '');
    if (!token) {
      return new NextResponse('Token missing', { status: 401 });
    }

    const authService = new AuthService();

    try {
      const { userId, role } = await authService.verifyToken(token);
      if (!userId) {
        return new NextResponse('Invalid userId', { status: 401 });
      }

      const newHeaders = new Headers(req.headers);
      newHeaders.set('x-user-id', userId);
      newHeaders.set('x-user-role', role.join(','));
      // Clone a new NextRequest
      const updatedRequest = new NextRequest(req, {
        headers: newHeaders,
      });
      console.log('updatedRequest', updatedRequest);
      return updatedRequest;
    } catch (error) {
      return new NextResponse('Invalid token', { status: 401 });
    }
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/**
 * Hàm này dùng để check xem có đăng nhập hay không, và kiểm tra role của user.
 * @param handler thường là một hàm xử lý request
 * @param role là role cần kiểm tra, nếu không truyền vào thì chỉ kiểm tra xem có authenticate không
 * @returns response
 */
export default function roleRequire(
  handler: Handler<{ req: NextRequest,params:any }>,
  role?: string | null,
): (req: NextRequest,params:any) => Promise<NextResponse> {
  return async function (req: NextRequest,params:any): Promise<NextResponse> {
    try {
      const authResult = await authMiddleware(req);
      if (authResult instanceof NextRequest) {
        if (role) {
          const userRoles = authResult.headers.get('x-user-role');
          if (!userRoles || !userRoles.includes(role)) {
            return new NextResponse('Forbidden', { status: 403 });
          }
        }
        return await handler(authResult,params);
      } else {
        return authResult;
      }
    } catch (error) {
      console.error('Error in roleRequire middleware:', error);
      return new NextResponse('Internal Server Error', {
        status: 500,
        statusText: 'Error when processing role require middleware',
      });
    }
  };
}
