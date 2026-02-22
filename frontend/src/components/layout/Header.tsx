import { Search, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useState, useEffect } from 'react';

export const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const { searchQuery, setSearchQuery } = useUiStore();

    const [localQuery, setLocalQuery] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [localQuery, setSearchQuery]);

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur-md">
            <div className="flex items-center gap-4 text-zinc-50">
                <button
                    onClick={onMenuClick}
                    className="block rounded-md p-2 hover:bg-zinc-800 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    NotesApp
                </h1>
            </div>

            <div className="w-full max-w-md px-4 hidden md:block">
                {/* We will handle search text state at feature level later, maybe keep it minimal for now */}
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search notes..."
                        icon={<Search className="h-4 w-4" />}
                        className="rounded-full bg-zinc-900 h-9 border-zinc-800"
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm font-medium text-zinc-300 md:block">
                            {user.name}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => logout()}
                            title="Logout"
                            className="text-zinc-400 hover:text-white px-2"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                ) : null}
            </div>
        </header>
    );
};
