import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { LoginDTO, RegisterDTO, FoodCreateDTO } from '@/lib/schemas';

export const useAuthQuery = () => {
  return useQuery(['auth','me'], async () => {
    const { data } = await api.get('/auth/me');
    return data;
  }, { retry: false });
};

export const useLogin = () => {
  return useMutation(async (payload: LoginDTO) => {
    const { data } = await api.post('/auth/login', payload);
    return data;
  });
};

export const useRegister = () => {
  return useMutation(async (payload: RegisterDTO) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  });
};

export const useFoods = () => {
  return useQuery(['foods'], async () => {
    const { data } = await api.get('/foods');
    return data;
  });
};

export const useCreateFood = () => {
  const qc = useQueryClient();
  return useMutation(async (formData: FormData) => {
    const { data } = await api.post('/partner/foods', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }, { onSuccess: () => qc.invalidateQueries(['foods']) });
};