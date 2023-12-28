import { Outlet } from 'react-router-dom';
import SideNavBar from './components/SideNavbar';

export default function Component() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
