import { Injectable } from '@nestjs/common';
import { TestimonialsRepository } from './testimonials.repository';
import { SearchQueryDto } from './dto/search.dto';
import { FilterQuery } from 'mongoose';
import { TestimonialDocument } from './models/testimonial.schema';

@Injectable()
export class TestimonialsService {
  constructor(
    private readonly testimonialsRepository: TestimonialsRepository,
  ) {}

  async find(searchQueryDto: SearchQueryDto) {
    const { searchTerm } = searchQueryDto;

    const filters: FilterQuery<TestimonialDocument> = {};

    if (searchTerm) {
      filters.$or = [
        { userName: { $regex: new RegExp(searchTerm, 'i') } },
        { projectDescription: { $regex: new RegExp(searchTerm, 'i') } },
      ];
    }

    return this.testimonialsRepository.find(filters);
  }
}
