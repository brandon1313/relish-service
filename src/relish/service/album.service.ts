import { Injectable } from '@nestjs/common';

import { AlbumAdapter } from '../adapter/album.adapter';
import { Album } from '../model/album.model';

@Injectable()
export class AlbumService {
  constructor(private readonly albumAdapter: AlbumAdapter) {}

  async getAlbums(): Promise<Album[]> {
    return await this.albumAdapter.getAll();
  }

  async getAlbumById(id: number): Promise<Album> {
    const album: Album = await this.albumAdapter.getById(id);

    if (!album) {
      throw new Error(`Album with id ${album} not found`);
    }

    return album;
  }
}
