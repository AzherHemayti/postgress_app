import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {

 @Post('login')
login(@Body() body: any) {

  console.log("LOGIN BODY:", body); // 👈 ADD THIS

  const { email, password } = body;

  if (email === 'admin@gmail.com' && password === '123456') {
    return {
      success: true,
      token: 'test-token',
    };
  }

  return {
    success: false,
    message: 'Invalid credentials',
  };
}
}