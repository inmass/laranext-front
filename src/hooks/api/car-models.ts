import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { CarModelType } from '@/types/car-model';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';

interface CarModelsResponse {
  data: CarModelType[];
  meta: Pagination;
  [key: string]: any;
}

export interface CarModelsParams extends GetRequestParams {};

export const getCarModels = (
  params: GetRequestParams,
): UseQueryResult<CarModelsResponse, Error> => {
  
  return useQuery({
    queryKey: ['carModels', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<CarModelsResponse>(ApiEndpoints.carModels, { params: apiParams });
      return data.data;
    },

    keepPreviousData: true,
  });
};