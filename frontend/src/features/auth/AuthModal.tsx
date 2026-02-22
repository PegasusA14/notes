import { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useLoginMutation, useRegisterMutation } from './api';
import toast from 'react-hot-toast';

export const AuthModal = () => {
    const { isLoginModalOpen, setLoginModalOpen } = useUiStore();
    const [view, setView] = useState<'login' | 'register'>('login');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();

    const isRegister = view === 'register';

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleClose = (open: boolean) => {
        setLoginModalOpen(open);
        if (!open) {
            setTimeout(() => setView('login'), 200);
            resetForm();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegister) {
            registerMutation.mutate(
                { name, email, password },
                {
                    onSuccess: () => {
                        toast.success('Registration successful. Please log in.');
                        setView('login');
                        setPassword('');
                    },
                    onError: (err: any) => {
                        toast.error(err.response?.data?.message || 'Failed to register');
                    },
                }
            );
        } else {
            loginMutation.mutate(
                { email, password },
                {
                    onSuccess: () => {
                        setLoginModalOpen(false);
                        resetForm();
                        toast.success('Logged in successfully');
                    },
                    onError: (err: any) => {
                        toast.error(err.response?.data?.message || 'Invalid credentials');
                    },
                }
            );
        }
    };

    const toggleView = () => {
        setView(isRegister ? 'login' : 'register');
        resetForm();
    };

    return (
        <Modal
            isOpen={isLoginModalOpen}
            onOpenChange={handleClose}
            title={isRegister ? 'Create an account' : 'Welcome back'}
            description={isRegister ? 'Enter your details to register.' : 'Enter your credentials to login.'}
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                {isRegister && (
                    <Input
                        label="Name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                    />
                )}
                <Input
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
                <Input
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={loginMutation.isPending || registerMutation.isPending}
                >
                    {isRegister ? 'Register' : 'Log in'}
                </Button>

                <div className="text-center text-sm text-zinc-400 mt-4">
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        onClick={toggleView}
                        className="text-primary-400 hover:text-primary-300 font-medium hover:underline"
                    >
                        {isRegister ? 'Log in' : 'Register'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
