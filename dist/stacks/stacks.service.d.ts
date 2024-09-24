import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { Stack } from './entities/stack.entity';
import { Repository } from 'typeorm';
export declare class StacksService {
    private stacksRepository;
    constructor(stacksRepository: Repository<Stack>);
    create(createStackDto: CreateStackDto): Promise<Stack>;
    getCount(): Promise<number>;
    findAll(): Promise<Stack[]>;
    findWithProjectCounts(): Promise<any>;
    findOne(id: string): Promise<Stack>;
    update(id: string, updateStackDto: UpdateStackDto): Promise<Stack>;
    remove(id: string): Promise<Stack>;
}
