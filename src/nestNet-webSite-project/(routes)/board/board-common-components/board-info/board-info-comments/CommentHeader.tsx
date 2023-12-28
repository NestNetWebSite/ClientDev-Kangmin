import getAvatarStyle from '../../../../../_utils/getAvatarStyle';
import type { CommentData } from '../types';

type Props = CommentData & { onCommentModifyFormOpen(): void; onCommentDelete(id: number): void };

export default function CommentHeader({
    id,
    username,
    createdTime,
    modifiedTime,
    memberWritten,
    onCommentModifyFormOpen,
    onCommentDelete,
}: Props) {
    console.log(memberWritten);

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <div
                    className='mr-4 flex h-12 w-12 items-center justify-center rounded-full p-1 text-center text-sm'
                    style={getAvatarStyle('GENERAL_MEMBER')}
                >
                    {username.slice(0, 3)}
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold'>{username}</p>
                    <div className='flex items-center'>
                        <span className='text-sm text-gray-700'>{`${createdTime[0]}년 ${createdTime[1]}월 ${createdTime[2]}일`}</span>
                        {modifiedTime !== null && (
                            <span className='ml-5 text-sm text-gray-700'>
                                수정한 날짜 : {`${modifiedTime[0]}년 ${modifiedTime[1]}월 ${modifiedTime[2]}일`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div>
                {memberWritten && (
                    <span>
                        <span
                            className='mx-1 cursor-pointer text-sm text-gray-400 duration-300 hover:text-gray-800'
                            onClick={onCommentModifyFormOpen}
                        >
                            수정
                        </span>
                        <span
                            className='mx-1 cursor-pointer text-sm text-gray-400 duration-300 hover:text-gray-800'
                            onClick={(): void => {
                                onCommentDelete(id);
                            }}
                        >
                            삭제
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
}
