import { useEffect, useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useUiStore } from '../../store/uiStore';
import type { NoteResponseDto } from '../../api/types';
import { useCreateNote, useUpdateNote } from './api';
import { useFolders } from '../folders/api';
import toast from 'react-hot-toast';

interface NoteEditorModalProps {
    noteToEdit?: NoteResponseDto | null;
    onClose: () => void;
}

export const NoteEditorModal = ({ noteToEdit, onClose }: NoteEditorModalProps) => {
    const { isNoteEditorOpen, setNoteEditorOpen } = useUiStore();
    const { data: folders } = useFolders();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [folderId, setFolderId] = useState<number | null>(null);

    const createNote = useCreateNote();
    const updateNote = useUpdateNote();

    useEffect(() => {
        if (isNoteEditorOpen) {
            if (noteToEdit) {
                setTitle(noteToEdit.title);
                setContent(noteToEdit.content);
                setFolderId(noteToEdit.folderId);
            } else {
                setTitle('');
                setContent('');
                // Maybe default to selected folder if any
                setFolderId(useUiStore.getState().selectedFolderId);
            }
        }
    }, [isNoteEditorOpen, noteToEdit]);

    const handleClose = (open: boolean) => {
        setNoteEditorOpen(open);
        if (!open) onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        if (noteToEdit) {
            updateNote.mutate(
                { id: noteToEdit.id, note: { title, content, folderId } },
                {
                    onSuccess: () => {
                        toast.success('Note updated');
                        handleClose(false);
                    },
                    onError: () => toast.error('Failed to update note'),
                }
            );
        } else {
            createNote.mutate(
                { title, content, folderId },
                {
                    onSuccess: () => {
                        toast.success('Note created');
                        handleClose(false);
                    },
                    onError: () => toast.error('Failed to create note'),
                }
            );
        }
    };

    const isPending = createNote.isPending || updateNote.isPending;

    return (
        <Modal
            isOpen={isNoteEditorOpen}
            onOpenChange={handleClose}
            title={noteToEdit ? 'Edit Note' : 'New Note'}
        >
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
                <Input
                    placeholder="Note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoFocus={!noteToEdit}
                    className="text-lg font-semibold"
                />

                <div className="flex flex-col">
                    <textarea
                        placeholder="Write your note here..."
                        className="h-64 resize-none rounded-md border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <select
                        className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={folderId || ''}
                        onChange={(e) => setFolderId(e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">No folder</option>
                        {folders?.map((f) => (
                            <option key={f.id} value={f.id}>
                                {f.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex space-x-2">
                        <Button type="button" variant="ghost" onClick={() => handleClose(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isPending}>
                            {noteToEdit ? 'Save' : 'Create'}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
