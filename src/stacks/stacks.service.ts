import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stack } from './entities/stack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StacksService {
  constructor(
    @InjectRepository(Stack)
    private stacksRepository: Repository<Stack>,
  ) {}

  async create(createStackDto: CreateStackDto) {
    try {
      const stack = this.stacksRepository.create(createStackDto);
      return await this.stacksRepository.save(stack);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`${createStackDto.name} already exists`);
      }
    }
  }

  getCount() {
    return this.stacksRepository.count();
  }

  findAll() {
    return this.stacksRepository.find();
  }

  async findWithProjectCounts(): Promise<any> {
    try {
      // Query to count projects per stack
      const stacks = await this.stacksRepository
        .createQueryBuilder('stack')
        .leftJoin('stack.projects', 'project')
        .select(['stack.id', 'stack.name'])
        .addSelect('COUNT(project.id)', 'projectCount')
        .groupBy('stack.id')
        .addGroupBy('stack.name')
        .orderBy('COUNT(project.id)', 'DESC') // Sort by projectCount in descending order
        .getRawMany();

      // Map the raw results to desired format
      return stacks.map((stack) => ({
        id: stack.stack_id,
        name: stack.stack_name,
        projectCount: parseInt(stack.projectCount, 10),
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findOne(id: string): Promise<Stack> {
    const founded = await this.stacksRepository.findOneBy({ id });

    if (!founded) {
      throw new NotFoundException();
    }

    return founded;
  }

  async update(id: string, updateStackDto: UpdateStackDto): Promise<Stack> {
    const found = await this.findOne(id);

    const update = await this.stacksRepository.save({
      ...found,
      name: updateStackDto.name,
    });

    await this.stacksRepository.update(id, update);

    return update;
  }

  async remove(id: string) {
    const found = await this.findOne(id);

    return await this.stacksRepository.remove(found);
  }
}
