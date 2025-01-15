import { ConfigService } from '@nestjs/config';

import { User } from '../model/user.model';
import { Injectable } from '@nestjs/common';
import { BaseAdapter } from './base.adapter';

@Injectable()
export class UserAdapter extends BaseAdapter<User> {
  constructor(configService: ConfigService) {
    super(configService, 'users');
  }
}
