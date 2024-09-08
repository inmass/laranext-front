import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import axios from '@/lib/axios';
import ApiEndpoints from '@/constants/ApiEndpoints';
import { CarListingType } from '@/types/car-listing';
import { GetRequestParams, Pagination } from '../../lib/api-params';
import { buildApiParams } from '@/lib/api-param-builder';
import { fileToBase64 } from '@/lib/helpers';
import toast from 'react-hot-toast';

interface CarListingsResponse {
  data: CarListingType[];
  meta: Pagination;
}

export interface CarListingsParams extends GetRequestParams {};

export const getCarListings = (
  params: GetRequestParams
): UseQueryResult<CarListingsResponse, Error> => {
  return useQuery({
    queryKey: ['carListings', params],
    queryFn: async () => {
      const apiParams = buildApiParams(params);
      const { data } = await axios.get<CarListingsResponse>(ApiEndpoints.carListings, { params: apiParams });
      return data;
    },
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};


export const getCarListing = (id: number): UseQueryResult<CarListingType, Error> => {
  return useQuery({
    queryKey: ['carListing', id],
    queryFn: async () => {
      const { data } = await axios.get<CarListingType>(`${ApiEndpoints.carListings}/${id}`);
      return data;
    },
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
    image: File;
    is_primary: boolean;
  }[];
};

export const useCreateCarListing = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCarListingFormData) => {
      const modifiedData = JSON.parse(JSON.stringify(data));
      modifiedData.images = await Promise.all(data.images.map(async (img) => ({
        image: await fileToBase64(img.image),
        is_primary: img.is_primary
      })));
      const { data: response } = await axios.post<CarListingType>(ApiEndpoints.carListings, modifiedData)
      return response;
    },
    onSuccess: (data) => {
      toast.success('Car listing created successfully');
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === 'carListings',
      });
      
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};