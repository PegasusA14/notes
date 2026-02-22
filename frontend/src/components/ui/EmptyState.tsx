import type { ReactNode } from 'react';
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
        <div className={cn('flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-zinc-200 shadow-sm p-8', className)}>
            {icon && <div className="mb-4 rounded-full bg-primary-50 p-4 text-primary-500">{icon}</div>}
            <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
            {description && <p className="mt-2 text-sm text-zinc-500 max-w-sm">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
};
