import { Navigate, Outlet, useLocation } from 'react-router';
import useScrollToTop from '../_hooks/useScrollToTop';
import GlobalNavbar from '../_components/globalNavbar/GlobalNavbar';

export default function PublicRoute() {
    useScrollToTop();

    console.log('public router render');
    const pathname = useLocation().pathname;
    const isLoggedIn = Boolean(localStorage.getItem('access_token') ?? '');

    if ((pathname === '/signin' || pathname === '/signup') && isLoggedIn) {
        return <Navigate to={'/'} replace={true} />;
    }

    return (
        <>
            {pathname !== '/signin' && pathname !== '/signup' && pathname !== '/idpw-search' && <GlobalNavbar />}
            <Outlet />
        </>
    );
}
