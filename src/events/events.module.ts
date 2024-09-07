import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { AuthorizationMiddleware } from 'middleware/auth.middleware';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [EventsController],
  providers: [EventsService, AuthorizationMiddleware],
  exports: [AuthorizationMiddleware],
})
export class EventsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('events');
  }
}
