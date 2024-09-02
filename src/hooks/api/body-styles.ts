import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/ApiEndpoints';
import { BodyStyleType } from '@/types/body-style';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';

interface BodyStylesResponse {
  data: BodyStyleType[];
  meta: Pagination;
  [key: string]: any;
}

export interface BodyStylesParams extends GetRequestParams {};

export const getBodyStyles = (
  params: GetRequestParams,
): UseQueryResult<BodyStylesResponse, Error> => {
  
  return useQuery({
    queryKey: ['bodyStyles', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<BodyStylesResponse>(ApiEndpoints.bodyStyles, { params: apiParams });
      return data.data;
    },

    keepPreviousData: true,
  });
};