import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { IoPeopleOutline } from 'react-icons/io5';
import { PiMedalLight } from 'react-icons/pi';

export default function BoardCategories() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category') ?? 'free';
    console.log(currentCategory);

    const handleCategoryClick = useCallback((targetCategory: string) => {
        setSearchParams({ category: targetCategory, page: '1' });
    }, []);

    return (
        <div>
            <ul className={'mx-8 flex gap-x-5'}>
                {[
                    { category: 'free', icon: <IoPeopleOutline className={'h-5 w-5'} />, label: '자유' },
                    { category: 'dev', icon: <HiOutlineComputerDesktop className={'h-5 w-5'} />, label: '개발' },
                    { category: 'career', icon: <PiMedalLight className={'h-5 w-5'} />, label: '진로' },
                ].map(item => {
                    return (
                        <li
                            className={`${
                                currentCategory === item.category ? 'bg-rose-800 text-white' : 'bg-zinc-200 text-black'
                            } box-content flex w-20 cursor-pointer items-center justify-center gap-x-2 rounded-3xl px-2 py-2 text-[0.9rem] transition-all hover:bg-rose-800 hover:text-white`}
                            key={item.category}
                            onClick={() => {
                                handleCategoryClick(item.category);
                            }}
                        >
                            {item.icon}
                            <span className={'text-lg'}>{item.label}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
