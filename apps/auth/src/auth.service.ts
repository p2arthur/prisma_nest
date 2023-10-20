import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configServices: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User, response: Response) {
    const tokenPayload = {
      user_id: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() * this.configServices.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);
    console.log('JWT Token', token);

    response.cookie('Authentication', token, { httpOnly: true, expires });
  }
}
