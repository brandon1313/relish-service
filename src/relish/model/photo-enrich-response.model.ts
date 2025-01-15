import { Photo } from './photo.model';
import { User } from './user.model';

export interface PhotoEnrichResponse extends Omit<Photo, 'albumId'> {
  album: {
    id: number;
    title: string;
    user: User;
  };
}
