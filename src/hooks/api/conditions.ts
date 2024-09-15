import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { ConditionType } from '@/types/condition';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';

interface ConditionsResponse {
  data: ConditionType[];
  meta: Pagination;
  [key: string]: any;
}

export interface ConditionsParams extends GetRequestParams {};

export const getConditions = (
  params: GetRequestParams,
): UseQueryResult<ConditionsResponse, Error> => {
  
  return useQuery({
    queryKey: ['conditions', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<ConditionsResponse>(ApiEndpoints.conditions, { params: apiParams });
      return data.data;
    },

    keepPreviousData: true,
  });
};