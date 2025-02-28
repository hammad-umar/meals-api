import { Injectable, Logger } from '@nestjs/common';
import { MealsPlanService } from '../meals-plan/meals-plan.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MealsPlanScheduler {
  private readonly logger = new Logger(MealsPlanScheduler.name);

  constructor(private readonly mealsPlanService: MealsPlanService) {}

  // Every Sunday 12 AM PKT
  @Cron('0 0 * * 0', {
    timeZone: 'Asia/Karachi',
    name: 'updateMealPlans',
  })
  async updateMealPlans() {
    const members = await this.mealsPlanService.findAllMembers();
    for (const member of members) {
      const meals = this.mealsPlanService.generateMealPlan(
        member.dietaryRestrictions,
      );

      await this.mealsPlanService.updateMealPlan(
        member._id.toHexString(),
        meals,
      );

      this.logger.log(`Meal updated for member: ${member.name}`);
    }
  }
}
