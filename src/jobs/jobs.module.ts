import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MealsPlanScheduler } from './meals-plan.scheduler';
import { MealsPlanModule } from '../meals-plan/meals-plan.module';

@Module({
  imports: [ScheduleModule.forRoot(), MealsPlanModule],
  providers: [MealsPlanScheduler],
})
export class JobsModule {}
