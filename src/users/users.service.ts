import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersService: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    try {
      const user = this.usersService.create({
        ...createUserDto,
        password: hashPassword,
      });
      await this.usersService.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      }
    }
  }

  async getCount() {
    return this.usersService.count();
  }

  async findAll(): Promise<User[]> {
    return this.usersService.find({
      select: [
        'id',
        'username',
        'full_name',
        'email',
        'created_at',
        'updated_at',
      ],
    });
  }

  async findOne(id: string): Promise<User> {
    const founded = await this.usersService.findOneBy({ id });

    if (!founded) {
      throw new NotFoundException();
    }

    return founded;
  }

  async findByUsername(username: string): Promise<User> {
    const founded = await this.usersService.findOneBy({ username });

    if (!founded) {
      throw new NotFoundException();
    }

    return founded;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
