import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService : MoviesService){}

    //Ruta para obtener la categoria popular
    @Get('popular')
    getmoviespopular(){
        return this.moviesService.getPopularMovies();
    }

    //para el input search
    @Get('moviesearch')
    movieSearch(@Query('query') query : string){
        return this.moviesService.searchMovie(query);
    }

    //para obtener los generos
    @Get('genres')
    getMovieGenres() {
        return this.moviesService.getGenres();
    }

    //para obtener por id
    @Get(':id')
    getbyid(@Param('id') id: string){
        return this.moviesService.getbyid(id);
    }

    //Filtrar por el id del genero en la lista 
    @Get('genre/:id')
    getmoviesbygenre(@Param('id') idgenre : string){
        return this.moviesService.getbygenre(idgenre);
    }

    
}
