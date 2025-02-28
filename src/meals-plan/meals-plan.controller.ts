import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MealsPlanService } from './meals-plan.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateMemberDto } from './dto/create-member.dto';

@ApiTags('Meals Plan')
@Controller('meals-plan')
export class MealsPlanController {
  constructor(private readonly mealsPlanService: MealsPlanService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new member',
    description: 'Adds a new member to the meals plan.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('create-member')
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    return this.mealsPlanService.createMember(createMemberDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Fetch all members',
    description: 'Fetches a list of all members.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('members')
  async findAllMembers() {
    return this.mealsPlanService.findAllMembers();
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get meal plan by member ID',
    description: 'Fetches details of a specific meal plan by member ID.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/members/:memberId')
  async findOne(@Param('memberId') memberId: string) {
    return this.mealsPlanService.findOne(memberId);
  }
}
