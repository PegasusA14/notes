import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'outline';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                {
                    'border-transparent bg-primary-600 text-white shadow hover:bg-primary-700': variant === 'default',
                    'border-transparent bg-zinc-800 text-zinc-100 hover:bg-zinc-700': variant === 'secondary',
                    'text-zinc-100 border-zinc-700': variant === 'outline',
                },
                className
            )}
            {...props}
        />
    );
};
