import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/api-endpoints';
import { CarListingType } from '@/types/car-listing';
import { GetRequestParams, Pagination } from '../../lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import { fileToBase64 } from '@/lib/helpers';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export interface CarListingsResponse {
  data: CarListingType[];
  meta: Pagination;
}

export interface CarListingsParams extends GetRequestParams {}

export const getCarListings = (
  params: GetRequestParams
): UseQueryResult<CarListingsResponse, Error> => {
  return useQuery({
    queryKey: ['carListings', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<CarListingsResponse>(
        ApiEndpoints.carListings,
        { params: apiParams }
      );
      return data;
    },
    staleTime: 60 * 60 * 1000, // stale time means that the data will be considered fresh for 1 hour
  });
};

export const getCarListing = (
  slug: string
): UseQueryResult<CarListingType, Error> => {
  return useQuery({
    queryKey: ['carListing', slug],
    queryFn: async () => {
      const { data } = await axios.get<{ data: CarListingType }>(
        `${ApiEndpoints.carListings}/${slug}`
      );
      return data?.data;
    },
    staleTime: 60 * 60 * 1000,
  });
};

interface CreateCarListingFormData {
  make_id: string;
  car_model_id: string;
  body_style_id: string;
  condition_id: string;
  features: string[];
  title: string;
  description: string;
  price: number;
  original_price: number;
  year: number;
  mileage: number;
  exterior_color: string;
  interior_color: string;
  transmission: string;
  fuel_type: string;
  images: {
    image: File | string;
    is_primary: boolean;
  }[];
}

interface UpdateCarListingFormData extends CreateCarListingFormData {
  id: number;
  removed_image_ids?: number[];
  images: {
    id?: number;
    image: File | string;
    is_primary: boolean;
  }[];
}

export const useCreateCarListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.CarListings.api');

  return useMutation({
    mutationFn: async (data: CreateCarListingFormData) => {
      const modifiedData = JSON.parse(JSON.stringify(data));
      modifiedData.images = await Promise.all(
        data.images.map(async (img) => ({
          image:
            typeof img.image === 'string'
              ? img.image
              : await fileToBase64(img.image),
          is_primary: img.is_primary,
        }))
      );
      const { data: response } = await axios.post<CarListingType>(
        ApiEndpoints.carListings,
        modifiedData
      );
      return response;
    },
    onSuccess: (data) => {
      toast.success(t('createSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carListings',
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export const useDeleteCarListing = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.CarListings.api');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ApiEndpoints.carListings}/${id}`);
    },
    onSuccess: () => {
      toast.success(t('deleteSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carListings',
      });
    },
  });
};

export const useUpdateCarListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.CarListings.api');

  return useMutation({
    mutationFn: async (data: UpdateCarListingFormData) => {
      const modifiedData = JSON.parse(JSON.stringify(data));
      modifiedData.images = await Promise.all(
        data.images.map(async (img) => ({
          id: img.id,
          image:
            typeof img.image === 'string'
              ? img.image
              : await fileToBase64(img.image),
          is_primary: img.is_primary,
        }))
      );
      const { data: response } = await axios.put<CarListingType>(
        `${ApiEndpoints.carListings}/${data.id}`,
        modifiedData
      );
      return response;
    },
    onSuccess: (data) => {
      toast.success(t('updateSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carListings',
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export const useUpdateCarListingStatus = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('Dashboard.CarListings.api');

  return useMutation({
    mutationFn: async ({ id, is_sold }: { id: number; is_sold: 0 | 1 }) => {
      await axios.put(`${ApiEndpoints.carListingStatus(id)}`, { is_sold });
    },
    onSuccess: () => {
      toast.success(t('updateStatusSuccess'));
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carListings',
      });
    },
  });
};
