import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '@cats/entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = this.catRepository.create(createCatDto);
    return this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findById(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  async update(id: number, updateCatDto: CreateCatDto): Promise<Cat> {
    const cat = await this.catRepository.preload({
      id: id,
      ...updateCatDto,
    });
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return this.catRepository.save(cat);
  }

  async remove(id: number): Promise<void> {
    const result = await this.catRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Cat not found');
    }
  }
}
