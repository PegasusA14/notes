import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '../../api/client';
import type { AuthResponseDto } from '../../api/types';

export const AuthModal = () => {
    const { isLoginModalOpen, setLoginModalOpen } = useUiStore();
    const { login } = useAuthStore();

    const [isLoginView, setIsLoginView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = (open: boolean) => {
        // If user is not authenticated, we prevent closing the modal via generic means
        // but the Modal component's onOpenChange handles overlay clicks.
        // For a strict app we could simply refuse to close unless token exists.
        const token = useAuthStore.getState().token;
        if (token) {
            setLoginModalOpen(open);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isLoginView) {
                const { data } = await apiClient.post<AuthResponseDto>('/auth/login', { email, password });
                login(data.token, { name: data.name, email: data.email });
                toast.success('Successfully logged in');
            } else {
                const { data } = await apiClient.post<AuthResponseDto>('/auth/register', { name, email, password });
                login(data.token, { name: data.name, email: data.email });
                toast.success('Account created successfully');
            }
            setLoginModalOpen(false);
            setName('');
            setEmail('');
            setPassword('');
            setIsLoginView(true);
        } catch (err: any) {
            toast.error(err.response?.data || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <Modal
            isOpen={isLoginModalOpen}
            onOpenChange={handleClose}
            title={isLoginView ? 'Welcome Back' : 'Create an Account'}
            description={isLoginView ? 'Sign in to access your notes.' : 'Enter your details to get started.'}
        >
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-5">
                {!isLoginView && (
                    <Input
                        label="Name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<User className="h-4 w-4" />}
                    />
                )}
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="h-4 w-4" />}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="h-4 w-4" />}
                />

                <div className="pt-2">
                    <Button type="submit" className="w-full shadow-sm" size="lg" isLoading={isLoading}>
                        {isLoginView ? 'Sign In' : 'Create Account'}
                    </Button>
                </div>

                <p className="text-center text-sm text-zinc-500 mt-4">
                    {isLoginView ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        className="text-primary-600 hover:text-primary-700 font-semibold hover:underline"
                        onClick={toggleView}
                    >
                        {isLoginView ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </form>
        </Modal>
    );
};
