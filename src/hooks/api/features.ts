import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { FeatureType } from '@/types/feature';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';

interface FeaturesResponse {
  data: FeatureType[];
  meta: Pagination;
  [key: string]: any;
}

export interface FeaturesParams extends GetRequestParams {};

export const getFeatures = (
  params: GetRequestParams,
): UseQueryResult<FeaturesResponse, Error> => {
  
  return useQuery({
    queryKey: ['features', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<FeaturesResponse>(ApiEndpoints.features, { params: apiParams });
      return data;
    },

    keepPreviousData: true,
  });
};