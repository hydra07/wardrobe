import User from '@/models/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Error } from 'mongoose';

interface UserProfile {
  // id?: string;
  name: string;
  email: string;
  image?: string;
  username?: string;
}

interface Provider {
  provider: string;
  providerAccountId: string;
}

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

export default class AuthService {
  async authenticate(
    profile: UserProfile,
    provider: Provider,
  ): Promise<{
    isAuthenticated: boolean;
    message: string;
  }> {
    try {
      const user = await User.findOne({
        providerId: provider.providerAccountId,
        provider: provider.provider,
      });
      if (!user) {
        const newUser = new User({
          username: profile.username || profile.name,
          email: profile.email,
          avatar: profile.image,
          role: ['user'],
          provider: provider.provider,
          providerId: provider.providerAccountId,
        });
        await newUser.save();
        return {
          isAuthenticated: true,
          message: 'Authentication new user!',
        };
      } else {
        return {
          isAuthenticated: true,
          message: 'Authentication successful!',
        };
      }
    } catch (error: any) {
      return {
        isAuthenticated: false,
        message: `Authentication failed!,${error}`,
      };
    }
  }

  async generateToken(provider: Provider): Promise<string> {
    const user = await User.findOne({
      providerId: provider.providerAccountId,
      provider: provider.provider,
    });
    if (!user) {
      throw new Error('User not found!');
    }
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.EXPIRE_JWT,
        algorithm: 'HS256',
        allowInsecureKeySizes: true, // allow weak key
      },
    );
  }

  async decode(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch (error: any) {
      throw new Error(`Decode token failed!,${error}`);
    }
  }

  async refreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as DecodedToken;
      return jwt.sign(
        { id: decoded.id, role: decoded.role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.EXPIRE_JWT,
          algorithm: 'HS256',
          allowInsecureKeySizes: true, // allow weak key
        },
      );
    } catch (error) {
      throw new Error(
        `Refresh token failed!, ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
  }
}
