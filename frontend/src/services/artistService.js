import { useQuery } from '@tanstack/react-query';
import { api } from './api.js';

export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: async () => (await api.get('/artists')).data,
  });
};

export const useArtistDetail = (artistId) => {
  return useQuery({
    queryKey: ['artist', artistId],
    queryFn: async () => (await api.get(`/artists/${artistId}`)).data,
    enabled: !!artistId, 
  });
};