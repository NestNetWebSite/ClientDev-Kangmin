import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { IoPeopleOutline } from 'react-icons/io5';
import { PiMedalLight } from 'react-icons/pi';

export default function BoardCategories() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category') ?? 'free';

    const handleCategoryClick = useCallback((targetCategory: string) => {
        setSearchParams({ category: targetCategory, page: '1' });
    }, []);

    return (
        <div>
            <ul>
                {[
                    { category: 'free', icon: <IoPeopleOutline />, label: '자유' },
                    { category: 'dev', icon: <HiOutlineComputerDesktop />, label: '개발' },
                    { category: 'career', icon: <PiMedalLight />, label: '진로' },
                ].map((item) => {
                    return (
                        <li
                            key={item.category}
                            onClick={(): void => {
                                handleCategoryClick(item.category);
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
