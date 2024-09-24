import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
export declare class ExperiencesService {
    private experiencesRepository;
    constructor(experiencesRepository: Repository<Experience>);
    create(createExperienceDto: CreateExperienceDto): Promise<Experience>;
    findAll(): Promise<Experience[]>;
    findOne(id: string): Promise<Experience>;
    update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<{
        title?: string;
        employment_type?: string;
        company_name?: string;
        location?: string;
        location_type?: string;
        start_date?: Date;
        end_date?: Date;
        description?: string;
        id: string;
    } & Experience>;
    remove(id: string): Promise<Experience>;
}
