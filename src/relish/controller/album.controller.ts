import { Controller, Get, Param } from '@nestjs/common';
import { Album } from '../model/album.model';
import { AlbumService } from '../service/album.service';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums(): Promise<Album[]> {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: number): Promise<Album> {
    return await this.albumService.getAlbumById(id);
  }
}
