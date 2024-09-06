import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.interface';


@Injectable()
export class UsersService {
    private users : User[] = [
        {
            id: 1,
            email: 'dfsuesc@gamil.com',
            name: 'Diego Suescun',
            password: '123456',
            isActive: true,
            favs: [
              { id: 101, title: 'Movie A', releaseDate: '2024-01-01' },
              { id: 102, title: 'Movie B', releaseDate: '2024-02-01' },
            ],
          },
          {
            id: 2,
            email: 'bob@example.com',
            name: 'Bob',
            password: 'password2',
            isActive: true,
            favs: [
              { id: 201, title: 'Movie C', releaseDate: '2024-03-01' },
            ],
          },
    ];
    private counter = 3; //iniciamos el contador para los ids en 3 porque ya tengo 2 usuarios;


    createuser(email: string, name: string, password: string, favs: any[]) : User {
        const newData : User = {
            id: this.counter ++,
            email,
            name,
            password,
            isActive: true,
            favs
        }
        this.users.push(newData);
        return newData;
    };

    getallusers(): User[] { 
        return this.users
    }

    getbyiduser(id:number) : User{
        const find = this.users.find( user => user.id == id);
        if(!find){
            throw new NotFoundException("No se encontro el usuario");
        }
        return find;
    };

    updateuser(id: number, updateData : Partial<User>) : User{
        const find = this. getbyiduser(id);
        Object.assign(find, updateData)
        return find
    }

    softdelete(id : number) : User {
        const find = this. getbyiduser(id);
        find.isActive = false;
        return find;
    }
};
