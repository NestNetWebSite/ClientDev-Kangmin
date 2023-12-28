import { Outlet, } from "react-router-dom";
import SideNavbar from "./SideNavbar";

export default function Component()
{
    return (
        <div>
            <SideNavbar/>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};