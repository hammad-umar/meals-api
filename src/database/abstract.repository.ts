import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { Logger } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected readonly logger: Logger;

  constructor(public readonly model: Model<T>) {}

  async create(
    document: Omit<T, '_id' | 'createdAt' | 'updatedAt'>,
  ): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as T;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery).lean<T[]>(true);
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T | null> {
    const document = await this.model.findOne(filterQuery).lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { ...options, new: true })
      .lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
    }

    return document;
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T | null> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<T>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
    }

    return document;
  }
}
