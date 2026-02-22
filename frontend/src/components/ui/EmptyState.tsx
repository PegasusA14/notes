import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
    return (
        <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
            {icon && <div className="mb-4 rounded-full bg-zinc-900/50 p-4 text-zinc-500">{icon}</div>}
            <h3 className="text-lg font-semibold text-zinc-200">{title}</h3>
            {description && <p className="mt-2 text-sm text-zinc-400 max-w-sm">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
};
