import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: CreateUserDto): Promise<void>;
    signIn(signInDto: SignInDto): Promise<any>;
    getProfile(req: any): Promise<{
        sub: string;
        username: string;
        iat: number;
        exp: number;
    }>;
}
