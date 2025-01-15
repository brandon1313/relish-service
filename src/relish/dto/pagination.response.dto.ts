export class PaginationResponseDTO<T> {
  limit: number;
  offset: number;
  total: number;
  data: T[];

  constructor(limit: number, offset: number, total: number, data: T[]) {
    this.limit = limit;
    this.offset = offset;
    this.total = total;
    this.data = data;
  }
}
