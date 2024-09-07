import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { CustomError } from 'interceptor/custom-error';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/singUpDto';
import { passwordValidation, validateEmail } from 'utility/config/utility';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  jwtTokenGenerator(user: any): any {
    const data = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
    );

    return data;
  }

  async singUp(reqBody: SignUpDto) {
    const { email, password, username } = reqBody;

    if (!validateEmail(email)) {
      throw new CustomError('Invalid email');
    }

    if (!passwordValidation(password)) {
      throw new CustomError('Invalid password');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new CustomError('User already exist');
    }

    const hashPassword = await bcrypt.hash(password, 14);

    const newUser = await this.userRepository.create({
      email,
      password: hashPassword,
      username,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  // Login User
  async loginUser(reqBody: any): Promise<any> {
    // Return User entity

    try {
      const user = await this.userRepository.findOne({
        where: { email: reqBody.email },
      });
      const comparePassword = await bcrypt.compare(
        reqBody.password,
        user.password,
      );

      if (!comparePassword) {
        throw new CustomError('Invalid password');
      }

      if (!user) {
        throw new CustomError('User not found');
      }

      const user_with_token = await this.jwtTokenGenerator(user);

      return { token: user_with_token, ...user };
    } catch (error) {}
  }
}
