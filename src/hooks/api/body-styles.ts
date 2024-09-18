import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { BodyStyleType } from '@/types/body-style';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

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
      return data;
    },

    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

interface CreateBodyStyleFormData {
  name: string;
};

interface UpdateBodyStyleFormData extends CreateBodyStyleFormData {
  id: number;
};

export const useCreateBodyStyle = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.BodyStyles.api');

  return useMutation({
    mutationFn: async (data: CreateBodyStyleFormData) => {
      const { data: response } = await axios.post<BodyStyleType>(ApiEndpoints.bodyStyles, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('createSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'bodyStyles',
      });
    },
  });
};

export const useUpdateBodyStyle = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.BodyStyles.api');

  return useMutation({
    mutationFn: async (data: UpdateBodyStyleFormData) => {
      const { data: response } = await axios.put<BodyStyleType>(`${ApiEndpoints.bodyStyles}/${data.id}`, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'bodyStyles',
      });
    },
  });
};

export const useDeleteBodyStyle = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.BodyStyles.api');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ApiEndpoints.bodyStyles}/${id}`);
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'bodyStyles',
      });
    },
  });
};