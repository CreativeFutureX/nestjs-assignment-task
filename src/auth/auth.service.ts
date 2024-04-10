import { Injectable, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { AuthPayloadDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException("Registration failed");
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    return { message: "Registration successful" };
  }

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.usersRepository.findOne({ where: { email } });
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = findUser;

      return this.jwtService.sign(user);
    }

    return null;
  }
}
