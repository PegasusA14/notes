import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useUiStore } from './store/uiStore';
import { AuthModal } from './features/auth/AuthModal';
import { fetchMe } from './features/auth/api';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  const { token, logout, login } = useAuthStore();
  const { setLoginModalOpen, isLoginModalOpen } = useUiStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoginModalOpen(true);
        return;
      }
      try {
        const user = await fetchMe();
        if (user.name && user.email) {
          login(token, { name: user.name, email: user.email });
        }
      } catch (error) {
        logout();
        setLoginModalOpen(true);
      }
    };

    checkAuth();
  }, [token, setLoginModalOpen, logout, login]);

  // AuthModal determines its own open state via the store.
  // We render the Layout only if the user is authenticated (or we can render it behind the modal).
  // The Prompt requires "If no token -> show Login Modal centered on screen with blurred backdrop",
  // which works either way. We'll render AppLayout but it will be blurred out by the Modal backdrop.

  return (
    <>
      <AppLayout />
      {isLoginModalOpen && <AuthModal />}
    </>
  );
}

export default App;
