import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { TestimonialDocument } from './models/testimonial.schema';

@Injectable()
export class TestimonialsRepository extends AbstractRepository<TestimonialDocument> {
  protected readonly logger = new Logger(TestimonialsRepository.name);

  constructor(
    @InjectModel(TestimonialDocument.name)
    testimonialModel: Model<TestimonialDocument>,
  ) {
    super(testimonialModel);
  }
}
