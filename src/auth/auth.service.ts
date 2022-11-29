import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signup() {
    return { message: 'signup successfully' };
  }

  async signin() {
    return { message: 'signin successfully' };
  }

  async signout() {
    return { message: 'signout successfully' };
  }
}
