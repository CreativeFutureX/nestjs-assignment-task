import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@users/entities/user.entity";
import { Cat } from "@src/cats/entities/cat.entity";

@Entity()
export class FavoriteCat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Cat)
  cat: Cat;
}
