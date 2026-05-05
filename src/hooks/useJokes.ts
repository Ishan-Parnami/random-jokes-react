import { useState, useEffect, useCallback, useRef } from 'react';
import jokesService from '../api/jokesService';
import type { Joke, JokesQueryParams } from '../types/joke.types';

interface UseJokesReturn {
  jokes: Joke[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchJokes: (params?: JokesQueryParams) => Promise<void>;
  fetchRandomJoke: () => Promise<void>;
  fetchJokeById: (id: number) => Promise<void>;
  refreshJokes: () => void;
}

export const useJokes = (initialParams?: JokesQueryParams): UseJokesReturn => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryParams, setQueryParams] = useState<JokesQueryParams | undefined>(initialParams);
  const initialParamsRef = useRef(initialParams);

  const fetchJokes = useCallback(async (params?: JokesQueryParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await jokesService.getJokes(params);
      
      if (response.success && response.data.data) {
        setJokes(response.data.data);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.page);
        setQueryParams(params);
      } else {
        throw new Error('Failed to fetch jokes');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setJokes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRandomJoke = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await jokesService.getRandomJoke();
      
      if (response.success && response.data) {
        setJokes((prevJokes) => [response.data, ...prevJokes]);
      } else {
        throw new Error('Failed to fetch random joke');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJokeById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await jokesService.getJokeById(id);
      
      if (response.success && response.data) {
        setJokes([response.data]);
      } else {
        throw new Error(`Failed to fetch joke with ID ${id}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setJokes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshJokes = useCallback(() => {
    fetchJokes(queryParams);
  }, [fetchJokes, queryParams]);

  // Initial fetch on mount
  useEffect(() => {
    const id = setTimeout(() => {
      void fetchJokes(initialParamsRef.current);
    }, 0);

    return () => clearTimeout(id);
  }, [fetchJokes]);

  return { jokes, loading, error, totalPages, currentPage, fetchJokes, fetchRandomJoke, fetchJokeById, refreshJokes, };
};