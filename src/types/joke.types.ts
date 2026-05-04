export interface Joke {
  id: number;
  content: string;
  categories: string[];
}

export interface PaginatedJokesResponse {
  statusCode: number;
  data: {
    page: number;
    limit: number;
    totalPages: number;
    previousPage: boolean;
    nextPage: boolean;
    totalItems: number;
    currentPageItems: number;
    data: Joke[];
  };
  message: string;
  success: boolean;
}

export interface SingleJokeResponse {
  statusCode: number;
  data: Joke;
  message: string;
  success: boolean;
}

export interface JokesQueryParams {
  limit?: number;
  query?: string;
  page?: number;
  inc?: string;
}