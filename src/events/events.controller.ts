import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/singUpDto';
import { CustomError } from 'interceptor/custom-error';
import { UpdateEventDto } from './dto/UpdateEventDto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  // Create Event
  @Post('/create')
  async singUp(
    @Body() reqBody: CreateEventDto,
    @Req() request: any,
  ): Promise<any> {
    let response: any = await this.eventsService.createEvent(reqBody     ,request);
    if (response) {
      throw new HttpException(
        { message: 'Event registered successfully', data: response },
        HttpStatus.OK,
      );
    }
  }

  // Update Event
  @Put('/:event_id')
  async UpdateEvent(
    @Param('user_id') user_id: string,
    @Body() reqBody: UpdateEventDto,
  ): Promise<any> {
    let response: any = await this.eventsService.updateEvent(reqBody, user_id);
    console.log(response);
    if (response) {
      throw new HttpException(
        { message: 'Even updated successfully', data: response },
        HttpStatus.OK,
      );
    }
  }
}
