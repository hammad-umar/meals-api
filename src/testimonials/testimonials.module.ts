import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { DatabaseModule } from '../database/database.module';
import {
  TestimonialDocument,
  TestimonialSchema,
} from './models/testimonial.schema';
import { TestimonialsRepository } from './testimonials.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: TestimonialDocument.name,
        schema: TestimonialSchema,
      },
    ]),
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService, TestimonialsRepository],
})
export class TestimonialsModule {}
