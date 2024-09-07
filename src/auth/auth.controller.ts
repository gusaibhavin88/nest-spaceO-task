import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/singUpDto';
import { LoginDeo } from './dto/login.dto';
import { CustomError } from 'interceptor/custom-error';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  async singUp(@Body() reqBody: SignUpDto, @Req() request: any): Promise<any> {
    let singUp = await this.authService.singUp(reqBody);
    if (singUp) {
      throw new HttpException(
        { message: 'Users registered successfully' },
        HttpStatus.OK,
      );
    }
  }
  @Post('/log-in')
  async logIn(@Body() reqBody: LoginDeo, @Req() request: any): Promise<any> {
    let user = await this.authService.loginUser(reqBody);
    throw new HttpException(
      { message: 'Users fetched successfully', data: user },
      HttpStatus.OK,
    );
  }
}
