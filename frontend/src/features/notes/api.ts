import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import type { NoteDto, NoteResponseDto } from '../../api/types';

export const useNotes = (folderId: number | null) => {
    return useQuery({
        queryKey: ['notes', folderId],
        queryFn: async () => {
            const url = folderId !== null ? `/notes?folderId=${folderId}` : '/notes';
            const { data } = await apiClient.get<NoteResponseDto[]>(url);
            return data;
        },
    });
};

export const useAllNotesCount = () => {
    return useQuery({
        queryKey: ['notes', 'count'],
        queryFn: async () => {
            const { data } = await apiClient.get<NoteResponseDto[]>('/notes');
            return data.length;
        },
    });
};

export const useCreateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (note: NoteDto) => {
            const { data } = await apiClient.post<NoteResponseDto>('/notes', note);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        },
    });
};

export const useUpdateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, note }: { id: number; note: NoteDto }) => {
            const { data } = await apiClient.put<NoteResponseDto>(`/notes/${id}`, note);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await apiClient.delete(`/notes/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        },
    });
};
