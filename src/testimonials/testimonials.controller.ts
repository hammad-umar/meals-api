import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SearchQueryDto } from './dto/search.dto';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get testimonials',
    description: 'Get full list of testimonials.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async find(@Query() searchQueryDto: SearchQueryDto) {
    return this.testimonialsService.find(searchQueryDto);
  }
}
