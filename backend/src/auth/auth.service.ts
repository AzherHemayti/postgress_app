// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

// const prisma = new PrismaClient();

// @Injectable()
// export class AuthService {
//   constructor(private jwt: JwtService) {}

//  async register(data: { email: string; name: string; password: string }) {
//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   const user = await prisma.user.create({
//     data: {
//       email: data.email,
//       name: data.name,
//       password: hashedPassword,
//     },
//   });

//   const { password, ...result } = user;

//   return {
//     message: 'User registered',
//     user: result,
//   };
// }

//   async login(data: { email: string; password: string }) {
//     const user = await prisma.user.findUnique({
//       where: { email: data.email },
//     });

//     if (!user) throw new UnauthorizedException('Invalid credentials');

//     const isMatch = await bcrypt.compare(data.password, user.password);

//     if (!isMatch) throw new UnauthorizedException('Invalid credentials');

//     return {
//       access_token: this.jwt.sign({
//         userId: user.id,
//         email: user.email,
//       }),
//     };
//   }
// }







import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async login(data: { email: string; password: string }) {
    const adminEmail = "admin@gmail.com";
    const adminPasswordHash =
      "$2b$10$d6ibn2dxScFPjwvDMYtgSuQqNz/OBmcZPNHEZQTrTAWuw1eTCtR42"; // example hash

    if (data.email !== adminEmail) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(
      data.password,
      adminPasswordHash
    );

    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      access_token: this.jwt.sign({
        userId: 1,
        email: adminEmail,
        role: "admin",
      }),
    };
  }
}