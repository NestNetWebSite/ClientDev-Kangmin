import { Link, useLocation } from 'react-router-dom';
import { FaUserPen } from 'react-icons/fa6';
import { GoBook } from 'react-icons/go';

export default function SideNavbar() {
    const pathname = useLocation().pathname;
    return (
        <nav className={'mx-2 w-full px-2 py-3'}>
            <h1 className={'hidden'}>UserPage SideNav</h1>
            <ul className={'flex items-center gap-x-7'}>
                {[
                    { label: '활동 관리', pathname: '/user/activity', icon: <FaUserPen className={'g-7 w-7'} /> },
                    { label: '스터디 관리', pathname: '/user/study', icon: <GoBook className={'h-7 w-7'} /> },
                ].map((element) => {
                    return (
                        <li
                            key={element.label}
                            className={
                                'flex cursor-pointer items-center gap-x-2 hover:underline hover:decoration-2 hover:underline-offset-8'
                            }
                        >
                            {element.icon}
                            <Link className={'cursor-pointer font-semibold'} to={element.pathname}>
                                {element.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
