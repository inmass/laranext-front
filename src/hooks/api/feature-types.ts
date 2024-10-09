import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { FeatureTypeType } from '@/types/feature-type';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

interface FeatureTypesResponse {
  data: FeatureTypeType[];
  meta: Pagination;
  [key: string]: any;
}

export interface FeatureTypesParams extends GetRequestParams {};

export const getFeatureTypes = (
  params: FeatureTypesParams,
): UseQueryResult<FeatureTypesResponse, Error> => {
  
  return useQuery({
    queryKey: ['featureTypes', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<FeatureTypesResponse>(ApiEndpoints.featureTypes, { params: apiParams });
      return data;
    },

    keepPreviousData: true,
    staleTime: 60 * 60 * 1000,
  });
};

interface CreateFeatureTypeFormData {
  name: string;
};

interface UpdateFeatureTypeFormData extends CreateFeatureTypeFormData {
  id: number;
};

export const useCreateFeatureType = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.FeaturesTypes.api');

  return useMutation({
    mutationFn: async (data: CreateFeatureTypeFormData) => {
      const { data: response } = await axios.post<FeatureTypeType>(ApiEndpoints.featureTypes, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('createSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'featureTypes',
      });
    },
  });
};

export const useUpdateFeatureType = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.FeaturesTypes.api');

  return useMutation({
    mutationFn: async (data: UpdateFeatureTypeFormData) => {
      const { data: response } = await axios.put<FeatureTypeType>(`${ApiEndpoints.featureTypes}/${data.id}`, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'featureTypes',
      });
    },
  });
};

export const useDeleteFeatureType = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.FeaturesTypes.api');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ApiEndpoints.featureTypes}/${id}`);
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'featureTypes',
      });
    },
  });
};