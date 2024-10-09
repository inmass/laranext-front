import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { MakeType } from '@/types/make';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface MakesResponse {
  data: MakeType[];
  meta: Pagination;
  [key: string]: any;
}

export interface MakesParams extends GetRequestParams {};

export const getMakes = (
  params: MakesParams,
): UseQueryResult<MakesResponse, Error> => {
  
  return useQuery({
    queryKey: ['makes', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<MakesResponse>(ApiEndpoints.makes, { params: apiParams });
      return data;
    },

    keepPreviousData: true,
    staleTime: 60 * 60 * 1000,
  });
};

interface CreateMakeFormData {
  name: string;
};

interface UpdateMakeFormData extends CreateMakeFormData {
  id: number;
};

export const useCreateMake = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Makes.api');

  return useMutation({
    mutationFn: async (data: CreateMakeFormData) => {
      const { data: response } = await axios.post<MakeType>(ApiEndpoints.makes, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('createSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'makes',
      });
    },
  });
};

export const useUpdateMake = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Makes.api');

  return useMutation({
    mutationFn: async (data: UpdateMakeFormData) => {
      const { data: response } = await axios.put<MakeType>(`${ApiEndpoints.makes}/${data.id}`, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'makes',
      });
    },
  });
};


export const useDeleteMake = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.Makes.api');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ApiEndpoints.makes}/${id}`);
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'makes',
      });
    },
  });
}