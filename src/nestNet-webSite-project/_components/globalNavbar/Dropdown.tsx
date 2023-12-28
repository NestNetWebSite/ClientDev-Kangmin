import { MouseEvent, ReactElement, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        const handleOutsideClick = (event: CustomEvent<MouseEvent>) => {
            if (isDropdownOpen && !ulRef.current.contains(event.target as Node)) {
                onDropdownClose();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            console.log('in effect');
            document.removeEventListener('click', handleOutsideClick);
        };
    });

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
            {navItems.map((subItem) => {
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
