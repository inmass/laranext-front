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

export const useCarListings = (
  page: number, 
  perPage: number, 
  sort?: { key: string; direction: 'asc' | 'desc' } | null,
  filters?: Record<string, string>
): UseQueryResult<CarListingsResponse, Error> => {

  return useQuery({
    queryKey: ['carListings', page, perPage = 10, sort, filters],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = {
        page,
        per_page: perPage,
      };

      // Add sort in the format sort=key or sort=-key
      console.log('sort', sort);
      if (sort) {
        params.sort = `${sort.direction === 'asc' ? '' : '-'}${sort.key}`;
      }

      // Add filters in the format filter[key]=value
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params[`filter[${key}]`] = value;
          }
        });
      }

      const { data } = await axios.get<CarListingsResponse>(ApiEndpoints.carListings, { params });
      return data;
    },
    keepPreviousData: true,
  });
};

export const useCarListing = (id: number): UseQueryResult<CarListingType, Error> => {
  return useQuery({
    queryKey: ['carListing', id],
    queryFn: async () => {
      const { data } = await axios.get<CarListingType>(`${ApiEndpoints.carListings}/${id}`);
      return data;
    },
  });
};