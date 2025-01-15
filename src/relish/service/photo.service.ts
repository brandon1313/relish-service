import { Injectable } from '@nestjs/common';
import { Album } from '../model/album.model';
import { PhotoEnrichResponse } from '../model/photo-enrich-response.model';
import { Photo } from '../model/photo.model';
import { User } from '../model/user.model';
import { PhotoAdapter } from '../adapter/photo.adapter';
import { AlbumService } from './album.service';
import { UserService } from './user.service';
import { PaginationResponseDTO } from '../dto/pagination.response.dto';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoAdapter: PhotoAdapter,
    private readonly albumService: AlbumService,
    private readonly userService: UserService,
  ) {}

  async getPhotos(): Promise<Photo[]> {
    try {
      return await this.photoAdapter.getAll();
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw new Error('Could not fetch photos');
    }
  }

  async getFilteredPhotos(
    limit: number,
    offset: number,
    title?: string,
    albumTitle?: string,
    userEmail?: string,
  ): Promise<PaginationResponseDTO<PhotoEnrichResponse>> {
    try {
      const photos: Photo[] = await this.photoAdapter.getAll();
      const albums: Album[] = await this.albumService.getAlbums();
      const users: User[] = await this.userService.getUsers();

      const filteredUsers = userEmail
        ? users.filter((user) => user.email === userEmail)
        : users;

      const userMap = new Map(filteredUsers.map((user) => [user.id, user]));

      const filteredAlbums = albums.filter((album) => {
        const user = userMap.get(album.userId);
        return (!albumTitle || album.title.includes(albumTitle)) && user;
      });

      const albumMap = new Map(
        filteredAlbums.map((album) => [album.id, album]),
      );

      const enrichedPhotos: PhotoEnrichResponse[] = photos
        .filter((photo) => !title || photo.title.includes(title))
        .map((photo) => {
          const album = albumMap.get(photo.albumId);
          if (!album) return null;

          const user = userMap.get(album.userId);
          if (!user) return null;

          return {
            ...photo,
            album: {
              id: album.id,
              title: album.title,
              user: user,
            },
          };
        })
        .filter((photo) => photo !== null) as PhotoEnrichResponse[];

      const responseData = enrichedPhotos.slice(
        offset,
        Number(offset) + Number(limit),
      );
      return new PaginationResponseDTO(
        limit,
        offset,
        enrichedPhotos.length,
        responseData,
      );
    } catch (error) {
      console.error('Error fetching filtered photos: ', error);
      throw new Error('Could not fetch filtered photos');
    }
  }

  async getPhotoById(id: number): Promise<PhotoEnrichResponse> {
    try {
      const photo: Photo = await this.photoAdapter.getById(id);
      if (!photo) {
        throw new Error(`Photo with id ${id} not found`);
      }

      const { albumId, ...photoWithoutAlbumId } = photo;
      const album: Album = await this.albumService.getAlbumById(albumId);
      const user: User = await this.userService.getUserById(album.userId);

      return {
        ...photoWithoutAlbumId,
        album: {
          id: album.id,
          title: album.title,
          user: user,
        },
      };
    } catch (error) {
      console.error(`Error fetching photo with id ${id}:`, error);
      throw new Error(`Could not fetch photo with id ${id}`);
    }
  }
}
