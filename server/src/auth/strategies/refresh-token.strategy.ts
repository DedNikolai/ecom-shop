import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

const refreshFromCookie = (req: any) => req?.cookies?.refresh_token ?? null;

@Injectable()
export class RefreshTokentStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(cfg: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        refreshFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(), // резерв
      ]),
      secretOrKey: cfg.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }
  validate(req: any, payload: any) {
    const token = refreshFromCookie(req) || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    req.refreshToken = token; // знадобиться для звірки з хешем
    return payload;           // стане req.user
  }
}
