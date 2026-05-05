import apiClient from './axios.config';
import type { 
  PaginatedJokesResponse, 
  SingleJokeResponse, 
  JokesQueryParams 
} from '../types/joke.types';

class JokesService {
  async getJokes(params?: JokesQueryParams): Promise<PaginatedJokesResponse> {
    const response = await apiClient.get<PaginatedJokesResponse>('/randomjokes', {
      params: {
        limit: params?.limit || 10,
        query: params?.query || '',
        page: params?.page || 1,
        inc: params?.inc || 'categories,id,content',
      },
    });
    return response.data;
  }

  async getJokeById(id: number): Promise<SingleJokeResponse> {
    const response = await apiClient.get<SingleJokeResponse>(`/randomjokes/${id}`);
    return response.data;
  }

  async getRandomJoke(): Promise<SingleJokeResponse> {
    const response = await apiClient.get<SingleJokeResponse>('/randomjokes/joke/random');
    return response.data;
  }
}

export default new JokesService();