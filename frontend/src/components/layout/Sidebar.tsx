import { useState } from 'react';
import { Folder, LayoutGrid, Plus, Trash2, X } from 'lucide-react';
import { useFolders, useCreateFolder, useDeleteFolder } from '../../features/folders/api';
import { useUiStore } from '../../store/uiStore';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import toast from 'react-hot-toast';
// import { useNotes } from '../../features/notes/api';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    totalNotesCount?: number;
}

export const Sidebar = ({ isOpen, onClose, totalNotesCount = 0 }: SidebarProps) => {
    const { data: folders, isLoading } = useFolders();
    const { selectedFolderId, setSelectedFolderId } = useUiStore();

    const createFolder = useCreateFolder();
    const deleteFolder = useDeleteFolder();

    const [isCreating, setIsCreating] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const [folderToDelete, setFolderToDelete] = useState<number | null>(null);

    const handleCreate = (e: React.KeyboardEvent | React.FocusEvent) => {
        if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
        if (!newFolderName.trim()) {
            setIsCreating(false);
            return;
        }
        createFolder.mutate({ name: newFolderName.trim() }, {
            onSuccess: () => {
                setNewFolderName('');
                setIsCreating(false);
                toast.success('Folder created');
            },
            onError: () => toast.error('Failed to create folder')
        });
    };

    const handleDelete = () => {
        if (folderToDelete) {
            deleteFolder.mutate(folderToDelete, {
                onSuccess: () => {
                    toast.success('Folder deleted');
                    setFolderToDelete(null);
                    if (selectedFolderId === folderToDelete) {
                        setSelectedFolderId(null);
                    }
                },
                onError: () => toast.error('Failed to delete folder')
            });
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-800 bg-zinc-950 transition-transform duration-300 lg:static lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-16 items-center justify-between px-4 lg:hidden">
                    <span className="font-semibold text-zinc-100">Menu</span>
                    <button onClick={onClose} className="rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        <button
                            onClick={() => { setSelectedFolderId(null); onClose(); }}
                            className={cn(
                                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                selectedFolderId === null
                                    ? "bg-primary-600 outline-none text-white"
                                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <LayoutGrid className="h-4 w-4" />
                                All Notes
                            </div>
                            <Badge variant={selectedFolderId === null ? "outline" : "secondary"}>
                                {totalNotesCount}
                            </Badge>
                        </button>
                    </nav>

                    <div className="mt-8 px-3">
                        <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Folders
                        </h3>
                        <div className="space-y-1">
                            {isLoading ? (
                                <div className="px-3 py-2 text-sm text-zinc-500">Loading...</div>
                            ) : folders?.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-zinc-500">No folders yet</div>
                            ) : (
                                folders?.map((folder) => (
                                    <div key={folder.id} className="group relative flex items-center">
                                        <button
                                            onClick={() => { setSelectedFolderId(folder.id); onClose(); }}
                                            className={cn(
                                                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                                selectedFolderId === folder.id
                                                    ? "bg-primary-600/20 text-primary-400"
                                                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                            )}
                                        >
                                            <div className="flex items-center gap-3 truncate">
                                                <Folder className="h-4 w-4 flex-shrink-0" />
                                                <span className="truncate">{folder.name}</span>
                                            </div>
                                            <Badge variant="secondary" className="ml-2 bg-zinc-800 group-hover:bg-zinc-700">
                                                {folder.noteCount}
                                            </Badge>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFolderToDelete(folder.id); }}
                                            className="absolute right-12 hidden rounded p-1 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 group-hover:block"
                                            title="Delete folder"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))
                            )}

                            {isCreating ? (
                                <div className="px-3 py-2">
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Folder name..."
                                        className="w-full rounded bg-zinc-900 px-2 py-1 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-primary-500"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        onKeyDown={handleCreate}
                                        onBlur={handleCreate}
                                        disabled={createFolder.isPending}
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 mt-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    New Folder
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            <ConfirmDialog
                isOpen={folderToDelete !== null}
                onOpenChange={(open) => !open && setFolderToDelete(null)}
                title="Delete Folder"
                description="Are you sure you want to delete this folder? Your notes will not be deleted, they will become unorganized."
                onConfirm={handleDelete}
                isLoading={deleteFolder.isPending}
            />
        </>
    );
};
