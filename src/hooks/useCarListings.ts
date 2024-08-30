import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/ApiEndpoints';
import { CarListingType } from '@/types/car-listing';

interface CarListingsResponse {
  data: CarListingType[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export const useCarListings = (page: number, perPage: number = 10): UseQueryResult<CarListingsResponse, Error> => {
  return useQuery({
    queryKey: ['carListings', page, perPage],
    queryFn: async () => {
      const { data } = await axios.get(ApiEndpoints.carListings, {
        // params: { page, per_page: perPage }
        params: { page, per_page: perPage }
      });
      return data;
    },
    keepPreviousData: true,
  });
};

export const useCarListing = (id: number): UseQueryResult<CarListingType, Error> => {
  return useQuery({
    queryKey: ['carListing', id],
    queryFn: async () => {
      const { data } = await axios.get(`${ApiEndpoints.carListings}/${id}`);
      return data;
    },
  });
};