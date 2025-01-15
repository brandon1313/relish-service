import { Injectable } from '@nestjs/common';
import { UserAdapter } from '../adapter/user.adapter';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userAdapter: UserAdapter) {}

  async getUsers(): Promise<User[]> {
    return await this.userAdapter.getAll();
  }

  async getUserById(id: number): Promise<User> {
    const user: User = await this.userAdapter.getById(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }
}
