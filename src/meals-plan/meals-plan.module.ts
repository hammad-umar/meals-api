import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MemberDocument, MemberSchema } from './models/member.schema';
import { MealPlanDocument, MealPlanSchema } from './models/meal-plan.schema';
import { MealsPlanService } from './meals-plan.service';
import { MemberRepository } from './member.repository';
import { MealsPlanController } from './meals-plan.controller';
import { MealsPlanRepository } from './meals-plan.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: MemberDocument.name,
        schema: MemberSchema,
      },
      {
        name: MealPlanDocument.name,
        schema: MealPlanSchema,
      },
    ]),
  ],
  providers: [MealsPlanService, MemberRepository, MealsPlanRepository],
  controllers: [MealsPlanController],
})
export class MealsPlanModule {}
