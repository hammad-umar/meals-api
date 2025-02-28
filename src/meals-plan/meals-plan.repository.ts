import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { MealPlanDocument } from './models/meal-plan.schema';

@Injectable()
export class MealsPlanRepository extends AbstractRepository<MealPlanDocument> {
  protected readonly logger = new Logger(MealsPlanRepository.name);

  constructor(
    @InjectModel(MealPlanDocument.name) mealPlanModel: Model<MealPlanDocument>,
  ) {
    super(mealPlanModel);
  }
}
