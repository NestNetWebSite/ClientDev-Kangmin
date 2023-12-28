import { CiHeart } from 'react-icons/ci';
import { FiUserPlus } from 'react-icons/fi';
import { PiEyeLight } from 'react-icons/pi';

interface Props {
    title: string;
    username: string;
    viewCount: number;
    likeCount: number;
    createdTime: number[];
    modifiedTime: number[] | null;
    onModifyTextClick(): void;
    onDeleteTextClick(): void;
    memberWritten: boolean;
}

export default function BoardHeader({
    title,
    username,
    viewCount,
    likeCount,
    createdTime,
    modifiedTime,
    onModifyTextClick,
    onDeleteTextClick,
    memberWritten,
}: Props) {
    return (
        <header className='mb-4'>
            <h1 className='text-4xl font-semibold'>{title}</h1>
            <div className='mb-3 mt-7 flex justify-between'>
                <div className='flex items-center'>
                    <div className='mr-5 flex items-center'>
                        <FiUserPlus className='mr-3 h-6 w-6' />
                        <span className='text-[15px] font-bold'>{username}</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-[15px] font-semibold text-gray-600'>
                            {`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}
                        </span>
                        {modifiedTime !== null && (
                            <span className='text-[15px] text-gray-600'>
                                최종 수정 : {`${modifiedTime[0]}년 ${modifiedTime[1]}월 ${modifiedTime[2]}일`}
                            </span>
                        )}
                    </div>
                </div>
                <div className='mr-5 flex items-center'>
                    <div className='mr-6 flex items-center'>
                        <PiEyeLight className='mr-1 h-7 w-7 text-blue-400' />
                        <span className='text-base text-gray-600'>{viewCount}</span>
                    </div>
                    <div className='flex items-center'>
                        <CiHeart className='mr-1 h-7 w-7 text-red-400' />
                        <span className='text-base text-gray-600'>{likeCount}</span>
                    </div>
                </div>
            </div>
            {memberWritten && (
                <div className='mx-3 mt-2 text-right'>
                    <span
                        className='mx-2 cursor-pointer text-gray-500 duration-300 hover:text-gray-900'
                        onClick={(): void => {
                            onModifyTextClick();
                        }}
                    >
                        수정
                    </span>
                    <span
                        className='mx-2 cursor-pointer text-gray-500 duration-300 hover:text-gray-900'
                        onClick={(): void => {
                            onDeleteTextClick();
                        }}
                    >
                        삭제
                    </span>
                </div>
            )}
        </header>
    );
}
