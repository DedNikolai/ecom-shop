import { Body, Controller, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RefreshTokenGuard } from 'src/auth/guards/refresh-token.guard';
import { UpdateUserDto } from './dto/update.user.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('me')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async updateUser(@GetUser('userId') userId: string, @Body() dto: UpdateUserDto) {
    const updateUser = this.userService.updateUser(userId, dto);

    return updateUser;
  }
}
