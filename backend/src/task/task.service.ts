import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TaskService {

  createTask(userId: number, title: string) {
    return prisma.task.create({
      data: {
        title,
        userId,
      },
    });
  }

  getMyTasks(userId: number) {
    return prisma.task.findMany({
      where: { userId },
    });
  }

  deleteTask(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }
}