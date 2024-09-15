import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { MakeType } from '@/types/make';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';

interface MakesResponse {
  data: MakeType[];
  meta: Pagination;
  [key: string]: any;
}

export interface MakesParams extends GetRequestParams {};

export const getMakes = (
  params: GetRequestParams,
): UseQueryResult<MakesResponse, Error> => {
  
  return useQuery({
    queryKey: ['makes', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<MakesResponse>(ApiEndpoints.makes, { params: apiParams });
      return data.data;
    },

    keepPreviousData: true,
  });
};