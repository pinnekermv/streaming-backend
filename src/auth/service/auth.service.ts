import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async generateJwt(payload: { id: number; username: string }) {
    return this.jwtService.signAsync(payload);
  }
}
