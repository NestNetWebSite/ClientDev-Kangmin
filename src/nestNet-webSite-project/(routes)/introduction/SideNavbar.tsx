import { Link, useLocation, } from "react-router-dom";

export default function SideNavbar()
{
    const { pathname, } = useLocation();
    return (
        <nav>
            <ul>
                {
                    [
                        { label: "동아리 연혁", path: "/introduction/history", },
                        { label: "동아리 회칙", path: "/introduction/rules", },
                        { label: "지도교수 및 임원", path: "/introduction/executives", },
                        { label: "전 임원 소개", path: "/introduction/former-executives", },
                    ].map(element =>
                    {
                        return (
                            <li
                                className={`${pathname === element.path ? "text-zinc-800" : "text-gray-400 hover:text-gray-500"} duration-300`}
                            >
                                <Link to={element.path}>
                                    {element.label}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
};