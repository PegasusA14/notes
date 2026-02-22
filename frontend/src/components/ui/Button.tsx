import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { Spinner } from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
                    {
                        'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm': variant === 'primary',
                        'bg-zinc-100 text-zinc-900 hover:bg-zinc-200': variant === 'secondary',
                        'bg-transparent hover:bg-zinc-100 text-zinc-700': variant === 'ghost',
                        'bg-red-500 text-white hover:bg-red-600 shadow-sm': variant === 'danger',
                        'h-9 px-3 text-sm': size === 'sm',
                        'h-10 px-4 py-2': size === 'md',
                        'h-12 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {isLoading && <Spinner className="mr-2 h-4 w-4" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
