import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNotes, useDeleteNote } from './api';
import { useUiStore } from '../../store/uiStore';
import { useFolders } from '../folders/api';
import { NoteCard } from './NoteCard';
import { NoteEditorModal } from './NoteEditorModal';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import type { NoteResponseDto } from '../../api/types';
import toast from 'react-hot-toast';

export const NoteGrid = () => {
    const { selectedFolderId, setNoteEditorOpen, searchQuery } = useUiStore();
    const { data: notes, isLoading } = useNotes(selectedFolderId);
    const { data: folders } = useFolders();

    const deleteNote = useDeleteNote();

    const [noteToEdit, setNoteToEdit] = useState<NoteResponseDto | null>(null);
    const [noteToDelete, setNoteToDelete] = useState<number | null>(null);

    const folderName = selectedFolderId
        ? folders?.find((f) => f.id === selectedFolderId)?.name || 'Folder'
        : 'All Notes';

    const handleEdit = (note: NoteResponseDto) => {
        setNoteToEdit(note);
        setNoteEditorOpen(true);
    };

    const handleCreateNew = () => {
        setNoteToEdit(null);
        setNoteEditorOpen(true);
    };

    const handleDelete = () => {
        if (noteToDelete) {
            deleteNote.mutate(noteToDelete, {
                onSuccess: () => {
                    toast.success('Note deleted');
                    setNoteToDelete(null);
                },
                onError: () => toast.error('Failed to delete note'),
            });
        }
    };

    const filteredNotes = notes?.filter(note => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            note.title.toLowerCase().includes(query) ||
            (note.content && note.content.toLowerCase().includes(query))
        );
    });

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-white">{folderName}</h2>
                <Button onClick={handleCreateNew} className="hidden sm:flex" variant="primary">
                    <Plus className="mr-2 h-4 w-4" />
                    New Note
                </Button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
            ) : filteredNotes?.length === 0 ? (
                <EmptyState
                    title="No notes found"
                    description={
                        searchQuery
                            ? "No notes matched your search query."
                            : selectedFolderId
                                ? "This folder is empty. Create a new note to get started."
                                : "You don't have any notes yet. Create one to get started."
                    }
                    action={
                        <Button onClick={handleCreateNew}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Note
                        </Button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredNotes?.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={handleEdit}
                            onDelete={(id) => setNoteToDelete(id)}
                        />
                    ))}
                </div>
            )}

            {/* Floating action button for mobile */}
            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg sm:hidden"
                onClick={handleCreateNew}
            >
                <Plus className="h-6 w-6" />
            </Button>

            <NoteEditorModal
                noteToEdit={noteToEdit}
                onClose={() => setNoteToEdit(null)}
            />

            <ConfirmDialog
                isOpen={noteToDelete !== null}
                onOpenChange={(open) => !open && setNoteToDelete(null)}
                title="Delete Note"
                description="Are you sure you want to delete this note? This action cannot be undone."
                onConfirm={handleDelete}
                isLoading={deleteNote.isPending}
            />
        </div>
    );
};
