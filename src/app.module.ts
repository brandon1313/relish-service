import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './relish/controller/user.controller';
import { UserService } from './relish/service/user.service';
import { UserAdapter } from './relish/adapter/user.adapter';
import { AlbumService } from './relish/service/album.service';
import { AlbumAdapter } from './relish/adapter/album.adapter';
import { AlbumController } from './relish/controller/album.controller';
import { PhotoService } from './relish/service/photo.service';
import { PhotoAdapter } from './relish/adapter/photo.adapter';
import { PhotoController } from './relish/controller/photo.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController, AlbumController, PhotoController],
  providers: [
    AppService,
    UserService,
    UserAdapter,
    AlbumService,
    AlbumAdapter,
    PhotoService,
    PhotoAdapter,
  ],
})
export class AppModule {}
