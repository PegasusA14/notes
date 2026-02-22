import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAllNotesCount } from '../../features/notes/api';
import { NoteGrid } from '../../features/notes/NoteGrid';
import { useState } from 'react';

export const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: totalNotesCount } = useAllNotesCount();

    return (
        <div className="flex h-screen flex-col bg-zinc-50 text-zinc-900 overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    totalNotesCount={totalNotesCount || 0}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
                    {/* Main Content Area */}
                    <div className="mx-auto max-w-5xl">
                        {/* Notes Grid goes here */}
                        <NoteGrid />
                    </div>
                </main>
            </div>
        </div>
    );
};
