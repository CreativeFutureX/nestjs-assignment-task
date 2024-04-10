import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./entities/cat.entity";
import { ParseIntPipe } from "@common/pipes/parse-int.pipe";
import { Roles } from "@common/decorators/roles.decorator";
import { RolesGuard } from "@src/common/guards/roles.guard";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(["admin"])
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  @Roles(["admin"])
  async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.catsService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(":id")
  @Roles(["admin"])
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCatDto: CreateCatDto,
  ): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }
}
