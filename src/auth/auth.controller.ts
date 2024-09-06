import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post('register')
    async register(
        @Body('email') email : string,
        @Body('name') name : string,
        @Body('password') password : string,
        @Body('favs') favs : any[],
    ){
        return this.authService.register(email, name, password, favs);
    };

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ){
        return this.authService.login(email, password);
    }
}
