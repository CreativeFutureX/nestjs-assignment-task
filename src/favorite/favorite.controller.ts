import { Controller, Post, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':catId')
  addFavorite(
    @Param('userId', ParseIntPipe) userId: number, 
    @Param('catId', ParseIntPipe) catId: number
  ) {
    return this.favoriteService.addFavorite(userId, catId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':catId')
  removeFavorite(
    @Param('userId', ParseIntPipe) userId: number, 
    @Param('catId', ParseIntPipe) catId: number
  ) {
    return this.favoriteService.removeFavorite(userId, catId);
  }
}
