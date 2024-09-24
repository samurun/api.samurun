import { StacksService } from './stacks.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
export declare class StacksController {
    private readonly stacksService;
    constructor(stacksService: StacksService);
    create(createStackDto: CreateStackDto): Promise<import("./entities/stack.entity").Stack>;
    findAll(): Promise<import("./entities/stack.entity").Stack[]>;
    findOne(id: string): Promise<import("./entities/stack.entity").Stack>;
    update(id: string, updateStackDto: UpdateStackDto): Promise<import("./entities/stack.entity").Stack>;
    remove(id: string): Promise<import("./entities/stack.entity").Stack>;
}
