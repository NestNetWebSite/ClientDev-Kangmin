import { CiHeart } from 'react-icons/ci';
import { HiCalendarDays } from 'react-icons/hi2';
import { PiEyeLight } from 'react-icons/pi';
import WriterAvatar from './WriterAvatar';

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
            className='my-3 cursor-pointer rounded-lg border border-gray-200 px-7 py-6 duration-300 hover:bg-gray-50'
            onClick={(): void => {
                onBoardClick(id);
            }}
        >
            <div className='mb-5 flex justify-between'>
                <div className='w-10/12'>
                    <h1 className='ml-1 line-clamp-1 text-xl font-bold text-neutral-800'>{title}</h1>
                </div>
                <WriterAvatar userName={userName} memberAuthority={'GENERAL_MEMBER'} />
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <HiCalendarDays className='mr-2 h-6 w-6 text-gray-600' />
                    <span className='text-[0.95rem] font-semibold text-gray-600'>{`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}</span>
                </div>
                <div className='flex rounded-xl border border-gray-200 px-5 py-2 shadow-sm'>
                    <div className='mr-3 flex items-center'>
                        <PiEyeLight className='mr-1 h-7 w-7 text-blue-400' />
                        <span className='text-sm font-semibold text-gray-600'>{viewCount}</span>
                    </div>
                    <div className='flex items-center'>
                        <CiHeart className='mr-1 h-7 w-7 text-red-400' />
                        <span className='text-sm font-semibold text-gray-600'>{likeCount}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
