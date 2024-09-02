import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/ApiEndpoints';
import { CarListingType } from '@/types/car-listing';
import { GetRequestParams, Pagination } from '../../lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';

interface CarListingsResponse {
  data: CarListingType[];
  meta: Pagination;
}

export interface CarListingsParams extends GetRequestParams {};

export const getCarListings = (
  params: GetRequestParams
): UseQueryResult<CarListingsResponse, Error> => {
  return useQuery({
    queryKey: ['carListings', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<CarListingsResponse>(ApiEndpoints.carListings, { params: apiParams });
      return data;
    },
    keepPreviousData: true,
  });
};


export const getCarListing = (id: number): UseQueryResult<CarListingType, Error> => {
  return useQuery({
    queryKey: ['carListing', id],
    queryFn: async () => {
      const { data } = await axios.get<CarListingType>(`${ApiEndpoints.carListings}/${id}`);
      return data;
    },
  });
};