import { Controller, Body, Get, Param, Post, Put, Query, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';

@Controller('users')
export class UsersController {
    
    constructor(private readonly userService : UsersService){}

    //creacion del usuario en la simulacion de DB
    @Post()
    create(
        @Body('email') email: string,
        @Body('name') name: string,
        @Body('password') password: string,
        @Body('favs') favs: any[]
    ) {
        const user = this.userService.createuser(email, name, password, favs);
        return user;
    }

    @Get()
    getallusers(){
        return this.userService.getallusers();
    };

    @Get(':id')
    getbyiduser(@Param('id') id: number){
        return this.userService.getbyiduser(id);
    }

    @Put(':id')
    updateuser(@Param('id') id: number, @Body() updateData: Partial<User>){
        return this.userService.updateuser(id, updateData)
    }

    @Put(':id/soft-delete')
    softDelete(@Param('id') id: number){
        return this.userService.softdelete(id);
    }

}
