import { formatDistanceToNow } from 'date-fns';
import { Edit2, Folder, Trash2 } from 'lucide-react';
import type { NoteResponseDto } from '../../api/types';
import { Badge } from '@/components/ui/badge';

interface NoteCardProps {
    note: NoteResponseDto;
    onEdit: (note: NoteResponseDto) => void;
    onDelete: (id: number) => void;
}

export const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
    return (
        <div className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-4 top-4 flex opacity-0 transition-opacity group-hover:opacity-100 items-center space-x-1">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                    className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                    title="Edit note"
                >
                    <Edit2 className="h-4 w-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                    className="rounded-full p-2 text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Delete note"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div
                className="flex-1 cursor-pointer outline-none"
                onClick={() => onEdit(note)}
                role="button"
                tabIndex={0}
            >
                <h3 className="mb-3 pr-16 text-lg font-bold text-zinc-900 line-clamp-1 leading-snug">
                    {note.title}
                </h3>

                <p className="mb-6 text-sm text-zinc-500 line-clamp-4 whitespace-pre-wrap leading-relaxed">
                    {note.content || <span className="italic text-zinc-400">Empty note</span>}
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100">
                <div className="flex items-center space-x-2">
                    {note.folderName && (
                        <Badge variant="secondary" className="flex items-center gap-1.5 text-xs bg-zinc-100 text-zinc-600">
                            <Folder className="h-3 w-3" />
                            <span className="max-w-[120px] truncate">{note.folderName}</span>
                        </Badge>
                    )}
                </div>
                <span className="text-xs font-medium text-zinc-400" title={new Date(note.createdAt).toLocaleString()}>
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </span>
            </div>
        </div>
    );
};
