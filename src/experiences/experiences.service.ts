import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const experience = this.experiencesRepository.create(createExperienceDto);

    return await this.experiencesRepository.save(experience);
  }

  async findAll(): Promise<Experience[]> {
    return await this.experiencesRepository.find({
      order: {
        start_date: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Experience> {
    const found = await this.experiencesRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    await this.findOne(id);

    const update = await this.experiencesRepository.save({
      id: id,
      ...updateExperienceDto,
    });

    await this.experiencesRepository.update(id, update);

    return update;
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    return await this.experiencesRepository.remove(found);
  }
}
