import { FavoriteCat } from '@src/favorite/entities/favorite-cat.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => FavoriteCat, (favoriteCat) => favoriteCat.user)
  favorites: FavoriteCat[];
}
