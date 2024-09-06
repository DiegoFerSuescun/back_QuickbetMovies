import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [HttpModule, ConfigModule], //Para mis peticiones http
    controllers:[MoviesController],
    providers:[MoviesService]
})
export class MoviesModule {}
