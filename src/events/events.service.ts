import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/singUpDto';
import { UpdateEventDto } from './dto/UpdateEventDto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async createEvent(reqBody: CreateEventDto, request: any) {
    const { name, description, endDate, startDate, totalGuests } = reqBody;
    const newEvent = await this.eventRepository.create({
      name,
      description,
      endDate,
      startDate,
      totalGuests,
      user: request?.user?.id,
    });

    return newEvent;
  }

  async updateEvent(reqBody: UpdateEventDto, id: string): Promise<Event> {
    const event = await this.eventRepository.preload({
      id,
      ...reqBody,
    });

    return event;
  }
}
