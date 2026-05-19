import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // ✅ use .env (NOT hardcoded)
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    // 🔐 admin-only check (optional but your requirement)
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('Access denied');
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  }
}