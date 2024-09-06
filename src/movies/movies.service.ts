import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
    //links para las peticiones
    private readonly apiKey: string;
    private readonly baseUrl: string = "https://api.themoviedb.org/3";

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.apiKey = this.configService.get<string>('API_KEY') || '787a93c8f94778188d00c9a8d5f51db3';
    }

    //Para obtener las peliculas Populares

    getPopularMovies(){
        const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;
        return this.httpService.get(url).pipe( map (response => response.data))
    };

    //para obtener solo una pelicula

    searchMovie(query: string){
        const url =  `${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`;
        return this.httpService.get(url).pipe(
            map(response => response.data)
        );
    };

    //para obtener el listado de generos

    getGenres(){
        const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`;
        return this.httpService.get(url).pipe(
            map(response => response.data)
        )
    }

    //para obtener por id

    getbyid(id : string){
        const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
        return this.httpService.get(url).pipe(
            map(response => response.data)
        )
    }

    //para obtener peliculas por el genero en el filtro de mi front

    getbygenre( idgenre : string){
        const url = `${this.baseUrl}/discover/movie?with_genres=${idgenre}&api_key=${this.apiKey}`;
        return this.httpService.get(url).pipe(
        map(response => response.data),
        catchError(error => {    
            return throwError(() => new Error('No se encontraron peliculas del genero seleccionado'));
        })
    );
    }

    
}

