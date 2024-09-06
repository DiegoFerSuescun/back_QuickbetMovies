import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService,
    ){}

    async register( email: string, name: string, password: string, favs: any[]): Promise<any>{
        //primero se debe verificar 
        const existing = await this.userService.getallusers().find(user => user.email == email);
        //si existe damos error
        if(existing){
            throw new UnauthorizedException('Usuario ya existe')
        }
        //cifrar la contraseña
        const hashedPass = await bcrypt.hash(password, 10);
        //creamos el usuario 
        return this.userService.createuser(email, name, hashedPass, favs);

    };

    async login( email: string, password: string): Promise<any>{
        //Buscamos los datos del usuario
        const exist = await this.userService.getallusers().find(user => user.email == email);
        if(!exist){
            throw new UnauthorizedException('No se encuentra el email')
        }

        //si pasa verificamos la contraseña

        const verifipass = await bcrypt.compare(password, exist.password);
        if( !verifipass){
            throw new UnauthorizedException('No coincide la contraseña')
        }

        //si pasa vamos a generar el token de jwt
        const payload = {email: exist.email, sub: exist.id};
        return{
            access_token : this.jwtService.sign(payload),
        };
    }

    //para restablecer contraseña

    async recoverypass (email: string, newpass : string): Promise<any>{
        const exist = this.userService.getallusers().find(user => user.email == email);
        if(!exist){
            throw new NotFoundException("No existe el usuario")
        };
        const hashedPass = await bcrypt.hash(newpass, 10);
        exist.password = hashedPass;
        return { user : exist ,message: 'Contraseña actualizada exitosamente' };
    }
}
