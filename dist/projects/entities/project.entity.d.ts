import { Stack } from '../../stacks/entities/stack.entity';
export declare class Project {
    id: string;
    title: string;
    image_cover: string;
    description: string;
    url: string;
    created_at: Date;
    updated_at: Date;
    stacks: Stack[];
}
