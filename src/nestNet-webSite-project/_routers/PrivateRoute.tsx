import { Outlet, Navigate } from 'react-router-dom';
import useScrollToTop from '../_hooks/useScrollToTop';
import GlobalNavbar from '../_components/globalNavbar/GlobalNavbar';

export default function PrivateRoute() {
    useScrollToTop();

    // const isLoggedIn = Boolean(localStorage.getItem('access_token') ?? '');
    const isLoggedIn = true;
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
