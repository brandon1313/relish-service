import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseAdapter<T> {
  constructor(
    protected configService: ConfigService,
    protected path: string,
  ) {}

  baseURL = this.configService.get('EXTERNAL_API_BASE_URL');

  async getAll(): Promise<T[]> {
    try {
      const response = await axios.get(`${this.baseURL}/${this.path}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async getById(id: number): Promise<T | null> {
    try {
      const response = await axios.get(`${this.baseURL}/${this.path}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      return null;
    }
  }
}
