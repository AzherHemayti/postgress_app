import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import * as createUserDto from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

       @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return req.user;
  }

  @Post()
  create(@Body() body: createUserDto.CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<createUserDto.CreateUserDto>) {
    return this.userService.updateUser(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));

 
}};