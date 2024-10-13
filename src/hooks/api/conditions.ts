import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { ConditionType } from '@/types/condition';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

interface ConditionsResponse {
  data: ConditionType[];
  meta: Pagination;
  [key: string]: any;
}

export interface ConditionsParams extends GetRequestParams {}

export const getConditions = (
  params: GetRequestParams
): UseQueryResult<ConditionsResponse, Error> => {
  return useQuery({
    queryKey: ['conditions', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<ConditionsResponse>(
        ApiEndpoints.conditions,
        { params: apiParams }
      );
      return data;
    },

    keepPreviousData: true,
    staleTime: 60 * 60 * 1000,
  });
};

interface CreateConditionFormData {
  name: string;
}

interface UpdateConditionFormData extends CreateConditionFormData {
  id: number;
}

export const useCreateCondition = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Conditions.api');

  return useMutation({
    mutationFn: async (data: CreateConditionFormData) => {
      const { data: response } = await axios.post<ConditionType>(
        ApiEndpoints.conditions,
        data
      );
      return response;
    },
    onSuccess: () => {
      toast.success(t('createSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'conditions',
      });
    },
  });
};

export const useUpdateCondition = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Conditions.api');

  return useMutation({
    mutationFn: async (data: UpdateConditionFormData) => {
      const { data: response } = await axios.put<ConditionType>(
        `${ApiEndpoints.conditions}/${data.id}`,
        data
      );
      return response;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'conditions',
      });
    },
  });
};

export const useDeleteCondition = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Conditions.api');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ApiEndpoints.conditions}/${id}`);
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'conditions',
      });
    },
  });
};
