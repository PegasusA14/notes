import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import type { FolderResponseDto, FolderDto } from '../../api/types';

export const useFolders = () => {
    return useQuery({
        queryKey: ['folders'],
        queryFn: async () => {
            const { data } = await apiClient.get<FolderResponseDto[]>('/folders');
            return data;
        },
    });
};

export const useCreateFolder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (folder: FolderDto) => {
            const { data } = await apiClient.post<FolderResponseDto>('/folders', folder);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        },
    });
};

export const useDeleteFolder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await apiClient.delete(`/folders/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
            queryClient.invalidateQueries({ queryKey: ['notes'] }); // Notes become unorganized
        },
    });
};
