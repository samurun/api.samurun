import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
export declare class ExperiencesController {
    private readonly experiencesService;
    constructor(experiencesService: ExperiencesService);
    create(createExperienceDto: CreateExperienceDto): Promise<import("./entities/experience.entity").Experience>;
    findAll(): Promise<import("./entities/experience.entity").Experience[]>;
    findOne(id: string): Promise<import("./entities/experience.entity").Experience>;
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
    } & import("./entities/experience.entity").Experience>;
    remove(id: string): Promise<import("./entities/experience.entity").Experience>;
}
