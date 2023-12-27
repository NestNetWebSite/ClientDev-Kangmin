import { useQueryClient } from '@tanstack/react-query';
import LoginStatusArea from './LoginStatusArea';
import LogoutStatusArea from './LogoutStatusArea';

export default function AuthStatusArea() {
    const queryClient = useQueryClient();
    // const isLoggedIn = queryClient.getQueryData(['accessToken']) !== '';
    const isLoggedIn = Boolean(localStorage.getItem('access_token') ?? '');
    return <>{isLoggedIn ? <LoginStatusArea /> : <LogoutStatusArea />}</>;
}
