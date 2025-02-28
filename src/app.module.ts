import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MealsPlanModule } from './meals-plan/meals-plan.module';
import { JobsModule } from './jobs/jobs.module';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MealsPlanModule,
    JobsModule,
  ],
})
export class AppModule {}
