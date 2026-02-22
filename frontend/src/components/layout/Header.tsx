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
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-md">
            <div className="flex items-center gap-4 text-zinc-900">
                <button
                    onClick={onMenuClick}
                    className="block rounded-md p-2 hover:bg-zinc-100 lg:hidden text-zinc-600"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-lg leading-none">N</span>
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                        Notes
                    </h1>
                </div>
            </div>

            <div className="w-full max-w-md px-4 hidden md:block">
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search notes..."
                        icon={<Search className="h-4 w-4" />}
                        className="rounded-full bg-zinc-50 h-10 border-zinc-200 shadow-inner"
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm font-medium text-zinc-600 md:block">
                            {user.name}
                        </span>
                        <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 overflow-hidden hidden md:flex">
                            <span className="text-xs font-bold text-zinc-600 uppercase">{user.name.charAt(0)}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => logout()}
                            title="Logout"
                            className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-2 rounded-full"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                ) : null}
            </div>
        </header>
    );
};
