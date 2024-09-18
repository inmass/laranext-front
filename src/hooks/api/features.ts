import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { FeatureType } from '@/types/feature';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

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
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

interface CreateFeatureFormData {
  name: string;
};

interface UpdateFeatureFormData extends CreateFeatureFormData {
  id: number;
};

export const useCreateFeature = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Features.api');

  return useMutation({
    mutationFn: async (data: CreateFeatureFormData) => {
      const { data: response } = await axios.post<FeatureType>(ApiEndpoints.features, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('createSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'features',
      });
    },
  });
};

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Features.api');

  return useMutation({
    mutationFn: async (data: UpdateFeatureFormData) => {
      const { data: response } = await axios.put<FeatureType>(`${ApiEndpoints.features}/${data.id}`, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'features',
      });
    },
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Features.api');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ApiEndpoints.features}/${id}`);
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'features',
      });
    },
  });
};