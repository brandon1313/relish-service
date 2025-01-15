import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { BaseAdapter } from './base.adapter';
import { Album } from '../model/album.model';

@Injectable()
export class AlbumAdapter extends BaseAdapter<Album> {
  constructor(configService: ConfigService) {
    super(configService, 'albums');
  }
}
