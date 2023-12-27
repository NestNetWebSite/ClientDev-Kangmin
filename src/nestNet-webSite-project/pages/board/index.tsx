import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavbar';

export default function Component() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
