import { create } from 'zustand';

interface UiState {
    selectedFolderId: number | null;
    setSelectedFolderId: (id: number | null) => void;

    isLoginModalOpen: boolean;
    setLoginModalOpen: (open: boolean) => void;

    isNoteEditorOpen: boolean;
    setNoteEditorOpen: (open: boolean) => void;
    editingNoteId: number | null;
    setEditingNoteId: (id: number | null) => void;

    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
    selectedFolderId: null,
    setSelectedFolderId: (id) => set({ selectedFolderId: id }),

    isLoginModalOpen: false,
    setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),

    isNoteEditorOpen: false,
    setNoteEditorOpen: (open) => set({ isNoteEditorOpen: open }),

    editingNoteId: null,
    setEditingNoteId: (id) => set({ editingNoteId: id }),

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
}));
