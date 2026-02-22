import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import type { AuthResponseDto } from '../../api/types';
import { useAuthStore } from '../../store/authStore';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (credentials: any) => {
            const { data } = await apiClient.post<AuthResponseDto>('/auth/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            useAuthStore.getState().login(data.token, { name: data.name, email: data.email });
        },
    });
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: async (credentials: any) => {
            const { data } = await apiClient.post('/auth/register', credentials);
            return data;
        },
    });
};

export const fetchMe = async () => {
    const { data } = await apiClient.get<Partial<AuthResponseDto>>('/auth/me');
    return data;
};
