import { CiHeart } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { HiCalendarDays } from 'react-icons/hi2';
import { PiEyeLight } from 'react-icons/pi';
import formatNumber from '../../../../_utils/formatNumber';

interface Props {
    id: string;
    userName: string;
    title: string;
    createdTime: number[];
    viewCount: number;
    likeCount: number;

    onBoardClick(id: string): void;
}

export default function Board({ id, userName, title, createdTime, viewCount, likeCount, onBoardClick }: Props) {
    return (
        <article
            className={
                'my-3 flex h-56 cursor-pointer flex-col justify-between rounded-2xl border border-gray-100 px-7 py-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl'
            }
            onClick={() => {
                onBoardClick(id);
            }}
        >
            <div>
                <div className={'mx-1 mb-5 flex items-center gap-x-1.5'}>
                    <HiCalendarDays className={'h-5 w-5 text-rose-800'} />
                    <span className={'text-[0.9rem] font-semibold text-rose-800'}>
                        {`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}
                    </span>
                </div>
                <div>
                    <h1 className={'ml-1 line-clamp-2 text-2xl font-bold text-neutral-950'}>{title}</h1>
                </div>
            </div>
            <div className={'flex items-center justify-between'}>
                <div className={'flex gap-x-2 text-slate-600'}>
                    <FaRegUser className={'h-5 w-5'} />
                    <span className={'text-[0.9rem] font-bold'}>{userName}</span>
                </div>
                <div className={'flex gap-x-4'}>
                    <div className={'flex items-center gap-x-2'}>
                        <CiHeart className={'h-6 w-6 text-red-400'} />
                        <span className={'text-sm text-slate-600'}>{formatNumber(likeCount, 1)}</span>
                    </div>
                    <div className={'flex items-center gap-x-2'}>
                        <PiEyeLight className={'h-6 w-6 text-blue-400'} />
                        <span className={'text-sm text-slate-600'}>{formatNumber(viewCount, 1)}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
