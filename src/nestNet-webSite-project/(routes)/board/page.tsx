import { Outlet } from 'react-router-dom';
import SideNavBar from './_components/SideNavbar';

export default function Component() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
