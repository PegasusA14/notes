import { formatDistanceToNow } from 'date-fns';
import { Edit2, Folder, Trash2 } from 'lucide-react';
import type { NoteResponseDto } from '../../api/types';
import { Badge } from '../../components/ui/Badge';

interface NoteCardProps {
    note: NoteResponseDto;
    onEdit: (note: NoteResponseDto) => void;
    onDelete: (id: number) => void;
}

export const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
    return (
        <div className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg">
            <div className="absolute right-4 top-4 flex opacity-0 transition-opacity group-hover:opacity-100 items-center space-x-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    title="Edit note"
                >
                    <Edit2 className="h-4 w-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                    className="rounded p-1.5 text-zinc-400 hover:bg-red-500/20 hover:text-red-400"
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
                <h3 className="mb-2 pr-16 text-lg font-semibold text-zinc-100 line-clamp-1">
                    {note.title}
                </h3>

                <p className="mb-4 text-sm text-zinc-400 line-clamp-3 whitespace-pre-wrap">
                    {note.content || <span className="italic text-zinc-600">Empty note</span>}
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center space-x-2">
                    {note.folderName && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Folder className="h-3 w-3" />
                            <span className="max-w-[100px] truncate">{note.folderName}</span>
                        </Badge>
                    )}
                </div>
                <span className="text-xs text-zinc-500" title={new Date(note.createdAt).toLocaleString()}>
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </span>
            </div>
        </div>
    );
};
