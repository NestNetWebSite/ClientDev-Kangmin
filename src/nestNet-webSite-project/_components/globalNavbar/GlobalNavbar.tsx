import { ReactElement, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AiOutlinePicture } from 'react-icons/ai';
import { BsFileRuled } from 'react-icons/bs';
import { FaChalkboardUser } from 'react-icons/fa6';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { LiaAddressBookSolid, LiaExclamationSolid, LiaUsersSolid } from 'react-icons/lia';
import { MdOutlineHistoryEdu } from 'react-icons/md';
import { PiCirclesThree, PiExamLight, PiUserSwitch } from 'react-icons/pi';
import Dropdown from './Dropdown';
import AuthStatusArea from './auth-status-area/AuthStatusArea';

interface NavItem {
    label: string;
    pathname: string;
    icon: ReactElement;
}

const navItemsInformation: { label: string; pathname?: string; navItems?: NavItem[] }[] = [
    {
        label: '소개',
        navItems: [
            {
                label: '동아리 연혁',
                pathname: '/introduction/history',
                icon: <MdOutlineHistoryEdu className={'h-6 w-6'} />,
            },
            { label: '동아리 회칙', pathname: '/introduction/rules', icon: <BsFileRuled className={'h-6 w-6'} /> },
            {
                label: '지도교수 및 임원',
                pathname: '/introduction/executives',
                icon: <LiaUsersSolid className={'h-6 w-6'} />,
            },
            {
                label: '전 임원 소개',
                pathname: '/introduction/former-executives',
                icon: <PiUserSwitch className={'h-6 w-6'} />,
            },
        ],
    },

    {
        label: '게시판',
        navItems: [
            { label: '갤러리', pathname: '/board/gallery', icon: <AiOutlinePicture className={'h-6 w-6'} /> },
            { label: '통합 게시판', pathname: '/board/unified', icon: <PiCirclesThree className={'h-6 w-6'} /> },
            { label: '족보 게시판', pathname: '/board/exam', icon: <PiExamLight className={'h-6 w-6'} /> },
            {
                label: '취업 게시판',
                pathname: '/board/recruit',
                icon: <HiOutlineBuildingOffice2 className={'h-6 w-6'} />,
            },
        ],
    },

    {
        label: '생활',
        navItems: [
            { label: '공지사항', pathname: '/life/notice', icon: <LiaExclamationSolid className={'h-6 w-6'} /> },
            { label: '자기 소개', pathname: '/life/introduction', icon: <FaChalkboardUser className={'h-6 w-6'} /> },
            { label: '출석부', pathname: '/life/attendance', icon: <LiaAddressBookSolid className={'h-6 w-6'} /> },
        ],
    },

    {
        label: '스터디',
        pathname: '/study',
    },
];

export default function GlobalNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownTarget, setDropdownTarget] = useState('');
    const location = useLocation();

    const handleDropdownClose = useCallback(() => {
        setIsDropdownOpen(false);
        setDropdownTarget('');
    }, []);

    const handleDropdownTargetSet = useCallback(
        (target: string) => {
            if (!isDropdownOpen) {
                setIsDropdownOpen(true);
                setDropdownTarget(target);
            } else if (isDropdownOpen && dropdownTarget !== target) {
                setDropdownTarget(target);
            } else if (isDropdownOpen && dropdownTarget === target) {
                setIsDropdownOpen(false);
                setDropdownTarget('');
            }
        },
        [isDropdownOpen, dropdownTarget],
    );

    return (
        <nav
            className={'z-10 flex h-[4.68rem] w-full justify-between border-b border-b-gray-200 bg-white p-4 shadow-sm'}
        >
            <div className={'flex-1'}>
                <Link
                    to={'/'}
                    className={'ml-5 text-[1.8rem] font-semibold leading-[2.6rem] tracking-wider text-rose-800'}
                >
                    NEST NET
                </Link>
            </div>
            <ul className={'relative flex flex-1 items-center justify-center gap-x-24'}>
                {navItemsInformation.map(itemInfo => {
                    if (itemInfo.label === '스터디') {
                        return (
                            <li
                                key={itemInfo.label}
                                className={
                                    'cursor-pointer font-semibold hover:underline hover:decoration-2 hover:underline-offset-8'
                                }
                            >
                                <Link to={itemInfo.pathname}>{itemInfo.label}</Link>
                            </li>
                        );
                    } else {
                        return (
                            <li
                                key={itemInfo.label}
                                className={'relative'}
                                onClick={(event): void => {
                                    event.stopPropagation();
                                    handleDropdownTargetSet(itemInfo.label);
                                }}
                            >
                                <span
                                    className={
                                        'cursor-pointer font-semibold hover:underline hover:decoration-2 hover:underline-offset-8'
                                    }
                                >
                                    {itemInfo.label}
                                </span>
                                <AnimatePresence>
                                    {isDropdownOpen && dropdownTarget === itemInfo.label && (
                                        <Dropdown
                                            isDropdownOpen={isDropdownOpen}
                                            onDropdownClose={handleDropdownClose}
                                            navItems={itemInfo.navItems}
                                        />
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    }
                })}
            </ul>
            <AuthStatusArea />
        </nav>
    );
}
