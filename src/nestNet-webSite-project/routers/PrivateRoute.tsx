import { Outlet, Navigate } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import GlobalNavbar from '../pages/globalNavbar/GlobalNavbar';

export default function PrivateRoute() {
    useScrollToTop();

    const isLoggedIn = Boolean(localStorage.getItem('access_token') ?? '');
    if (!isLoggedIn) {
        return <Navigate to={'/signIn'} replace={true} />;
    }

    return (
        <div>
            <GlobalNavbar />
            <Outlet />
        </div>
    );
}
