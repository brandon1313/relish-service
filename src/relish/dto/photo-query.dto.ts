export class GetPhotosQueryDto {
  title?: string;
  albumTitle?: string;
  userEmail?: string;
  limit: number = 25;
  offset: number = 0;
}
