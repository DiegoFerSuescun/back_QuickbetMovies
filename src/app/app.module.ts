import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from "src/movies/movies.module";
import { UsersModule } from "src/users/users.module";


@Module({
  imports: [ ConfigModule.forRoot(),
  MoviesModule, 
  UsersModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
