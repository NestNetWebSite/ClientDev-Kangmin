import { ReactElement, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDropdown from '../../_hooks/useDropdown';

interface Props {
    isDropdownOpen: boolean;

    onDropdownClose(): void;

    navItems: { label: string; pathname: string; icon: ReactElement }[];
}

export default function Dropdown({ isDropdownOpen, onDropdownClose, navItems }: Props) {
    const ulRef = useRef<HTMLUListElement>(null);
    const navigate = useNavigate();

    const handleSubItemClick = useCallback((pathname: string) => {
        navigate(pathname);
        onDropdownClose();
    }, []);

    useDropdown(ulRef, isDropdownOpen, onDropdownClose);

    return (
        <ul
            className={
                'absolute left-1/2 z-10 w-[11.5rem] -translate-x-1/2 translate-y-3 rounded-3xl border border-gray-200 bg-white px-5 py-3 shadow'
            }
            ref={ulRef}
            onClick={(event): void => {
                event.stopPropagation();
            }}
        >
            {navItems.map(subItem => {
                return (
                    <li
                        key={subItem.label}
                        className={
                            'my-3 flex cursor-pointer items-center gap-x-2.5 text-[0.92rem] font-semibold text-slate-600 hover:font-extrabold'
                        }
                        onClick={(): void => {
                            handleSubItemClick(subItem.pathname);
                        }}
                    >
                        {subItem.icon}
                        {subItem.label}
                    </li>
                );
            })}
        </ul>
    );
}
