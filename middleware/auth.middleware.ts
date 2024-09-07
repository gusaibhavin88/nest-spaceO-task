import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'; // Correct import statement
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    let currentUser: any;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    currentUser = await this.userRepository.findOne({
      where: { id: decoded?.id },
    });

    req['user'] = currentUser;
    next();
  }
}
