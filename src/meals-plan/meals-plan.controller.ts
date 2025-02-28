import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MealsPlanService } from './meals-plan.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateMemberDto } from './dto/create-member.dto';

@ApiTags('Meals Plan')
@Controller('meals-plan')
export class MealsPlanController {
  constructor(private readonly mealsPlanService: MealsPlanService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create-member')
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.mealsPlanService.createMember(createMemberDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('members')
  async findAllMembers() {
    return this.mealsPlanService.findAllMembers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/members/:memberId')
  async findOne(@Param('memberId') memberId: string) {
    return this.mealsPlanService.findOne(memberId);
  }
}
