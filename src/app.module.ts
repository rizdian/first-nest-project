import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { UserModule } from './modules/user/user.module';
import { AppLogger } from './common/logger/logger.service';
import { MdcMiddleware } from './common/logger/mdc.middleware';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    UserModule,
  ],
  providers: [AppLogger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MdcMiddleware).forRoutes('*');
  }
}
