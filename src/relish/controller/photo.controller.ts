import { Controller, Get, Query, Param } from '@nestjs/common';

import { PhotoService } from '../service/photo.service';
import { PhotoEnrichResponse } from '../model/photo-enrich-response.model';
import { GetPhotosQueryDto } from '../dto/photo-query.dto';
import { PaginationResponseDTO } from '../dto/pagination.response.dto';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async getPhotos(
    @Query() query: GetPhotosQueryDto,
  ): Promise<PaginationResponseDTO<PhotoEnrichResponse>> {
    const { limit, offset, title, albumTitle, userEmail } = query;
    return await this.photoService.getFilteredPhotos(
      limit,
      offset,
      title,
      albumTitle,
      userEmail,
    );
  }

  @Get(':id')
  async getPhotoById(@Param('id') id: number): Promise<PhotoEnrichResponse> {
    return await this.photoService.getPhotoById(id);
  }
}
