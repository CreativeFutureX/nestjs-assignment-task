import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";
import { FavoriteCat } from "./entities/favorite-cat.entity";
import { Cat } from "@src/cats/entities/cat.entity";
import { User } from "@src/users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteCat, Cat, User])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
