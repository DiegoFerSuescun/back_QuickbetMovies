import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY || '123456',
        })
    }

    async validate(payload : any){
        return this.userService.getallusers().find(user =>user.id == payload.sub)
    }
}