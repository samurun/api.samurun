import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Stack } from '../stacks/entities/stack.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Stack)
    private readonly stacksRepository: Repository<Stack>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<any> {
    const stacks = await this.stacksRepository.findBy({
      id: In(createProjectDto.stackIds),
    });

    const project = this.projectRepository.create({
      ...createProjectDto,
      stacks,
    });

    return this.projectRepository.save(project);
  }

  getCount(): Promise<any> {
    return this.projectRepository.count();
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['stacks'] });
  }

  async findOne(id: string): Promise<Project> {
    const founded = await this.projectRepository.findOne({
      where: { id },
      relations: ['stacks'], // Load existing relations
    });

    if (!founded) {
      throw new NotFoundException();
    }
    return founded;
  }

  async getRecentProjects(): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['stacks'],
      take: 5,
    });
    return projects;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateProjectDto> {
    const { stackIds } = updateProjectDto;
    await this.findOne(id);

    const updated = await this.projectRepository.save({
      id: id,
      ...updateProjectDto,
    });

    if (updateProjectDto.stackIds) {
      const stacks = await this.stacksRepository.findBy({
        id: In(stackIds),
      });

      updated.stacks = stacks; // Update the relation with new stacks
    }

    return this.projectRepository.save(updated);
  }

  async remove(id: string): Promise<any> {
    const founded = await this.findOne(id);

    return this.projectRepository.remove(founded);
  }
}
