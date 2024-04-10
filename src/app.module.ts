import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { CatsModule } from '@cats/cats.module';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './users/entities/user.entity';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    CoreModule,
    UsersModule,
    CatsModule,
    FavoriteModule
  ],
})
export class AppModule {}
