import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { CarModelType } from '@/types/car-model';
import { GetRequestParams, Pagination } from '@/lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import { useTranslations } from 'next-intl';
import { MakeType } from '@/types/make';
import toast from 'react-hot-toast';

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
      return data;
    },

    keepPreviousData: true,
    staleTime: 60 * 60 * 1000,
  });
};

interface CreateMakeFormData {
  name: string;
  make_id: string;
};

interface UpdateMakeFormData extends CreateMakeFormData {
  id: number;
};

export const useCreateCarModel = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.CarModels.api');

  return useMutation({
    mutationFn: async (data: CreateMakeFormData) => {
      const { data: response } = await axios.post<MakeType>(ApiEndpoints.carModels, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('createSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carModels',
      });
    },
  });
};

export const useUpdateCarModel = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.CarModels.api');

  return useMutation({
    mutationFn: async (data: UpdateMakeFormData) => {
      const { data: response } = await axios.put<MakeType>(`${ApiEndpoints.carModels}/${data.id}`, data);
      return response;
    },
    onSuccess: () => {
      toast.success(t('updateSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carModels',
      });
    },
  });
};

export const useDeleteCarModel = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.CarModels.api');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ApiEndpoints.carModels}/${id}`);
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carModels',
      });
    },
  });
};