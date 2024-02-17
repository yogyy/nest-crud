import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetCurrentUserId, GetUser } from './decorator';
import { JwtGuard, JwtRefreshGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signup(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('signup')
  signin(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(@GetUser('id') userId: number) {
    return this.authService.signout(userId);
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refrestoken(
    @GetCurrentUserId() userId: number,
    @GetUser('refreshToken') token: string,
  ) {
    return this.authService.refrestoken(userId, token);
  }
}
