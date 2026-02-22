import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'outline';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900',
                {
                    'border-transparent bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-800': variant === 'default',
                    'border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-200': variant === 'secondary',
                    'text-zinc-900 border-zinc-200': variant === 'outline',
                },
                className
            )}
            {...props}
        />
    );
};
