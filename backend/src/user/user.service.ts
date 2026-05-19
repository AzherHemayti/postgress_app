import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  [x: string]: any;

  async register(data: { email: string; name: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  getUsers() {
    return prisma.user.findMany();
  }

  updateUser(id: number, data: { email?: string; name?: string }) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}