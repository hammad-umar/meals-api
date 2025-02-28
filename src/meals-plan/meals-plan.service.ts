import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { MemberRepository } from './member.repository';
import { MealsPlanRepository } from './meals-plan.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberDocument } from './models/member.schema';
import { STATIC_MEAL_PLANS } from '../common';
import { MealPlanDocument } from './models/meal-plan.schema';

@Injectable()
export class MealsPlanService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly mealsPlanRepository: MealsPlanRepository,
  ) {}

  async createMember(
    createMemberDto: CreateMemberDto,
  ): Promise<MemberDocument> {
    let member = await this.memberRepository.findOne({
      email: createMemberDto.email,
    });

    if (member) {
      throw new UnprocessableEntityException('Member already exists.');
    }

    member = await this.memberRepository.create(createMemberDto);

    await this.mealsPlanRepository.create({
      member: member._id,
      meals: STATIC_MEAL_PLANS[createMemberDto.dietaryRestrictions],
    });

    return member;
  }

  async findAll(): Promise<MealPlanDocument[]> {
    return this.mealsPlanRepository.model
      .find({})
      .populate('member')
      .lean<MealPlanDocument[]>(true);
  }

  async findOne(memberId: string): Promise<MealPlanDocument> {
    const mealPlan = await this.mealsPlanRepository.findOne({
      member: new Types.ObjectId(memberId),
    });

    if (!mealPlan) {
      throw new NotFoundException('Meal plan not found.');
    }

    return mealPlan;
  }

  async findAllMembers(): Promise<MemberDocument[]> {
    return this.memberRepository.find({});
  }

  async updateMealPlan(
    memberId: string,
    meals: string[],
  ): Promise<MealPlanDocument> {
    return this.mealsPlanRepository.findOneAndUpdate(
      { member: new Types.ObjectId(memberId) },
      { $set: { meals } },
    );
  }

  generateMealPlan(dietaryRestrictions: string): string[] {
    return STATIC_MEAL_PLANS[dietaryRestrictions];
  }
}
