import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { MemberDocument } from './models/member.schema';

@Injectable()
export class MemberRepository extends AbstractRepository<MemberDocument> {
  protected readonly logger = new Logger(MemberRepository.name);

  constructor(
    @InjectModel(MemberDocument.name) memberModel: Model<MemberDocument>,
  ) {
    super(memberModel);
  }
}
