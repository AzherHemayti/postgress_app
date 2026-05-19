import { Controller, Post, Get, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body: { title: string }) {
    return this.taskService.createTask(req.user.userId, body.title);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyTasks(@Req() req) {
    return this.taskService.getMyTasks(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTask(@Req() req, @Body() body: any) {
    return this.taskService.deleteTask(body.id);
  }
}