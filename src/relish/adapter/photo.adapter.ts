import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
import { BaseAdapter } from './base.adapter';
import { Photo } from '../model/photo.model';

@Injectable()
export class PhotoAdapter extends BaseAdapter<Photo> {
  constructor(configService: ConfigService) {
    super(configService, 'photos');
  }
}
