import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteCat } from './entities/favorite-cat.entity';
import { User } from '@users/entities/user.entity';
import { Cat } from '@src/cats/entities/cat.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteCat)
    private favoriteCatRepository: Repository<FavoriteCat>,
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async addFavorite(userId: number, catId: number): Promise<FavoriteCat> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const cat = await this.catRepository.findOne({ where: { id: catId } });

    if (!user || !cat) {
      throw new NotFoundException('User or Cat not found');
    }

    const favorite = this.favoriteCatRepository.create({ user, cat });
    return this.favoriteCatRepository.save(favorite);
  }

  async removeFavorite(userId: number, catId: number): Promise<void> {
    const favorite = await this.favoriteCatRepository.findOne({
      where: {
        user: { id: userId },
        cat: { id: catId }
      }
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteCatRepository.remove(favorite);
  }
}