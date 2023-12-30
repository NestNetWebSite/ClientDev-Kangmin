import { useCallback, useState } from 'react';
import CommentHeader from './CommentHeader';
import CommentModifyForm from './CommentModifyForm';
import type { CommentData } from '../../types';

type Props = CommentData & {
    onCommentDelete(id: number): void;
    onCommentModify(id: number, newContent: string): void;
};

export default function Comment({
    id,
    username,
    content,
    createdTime,
    modifiedTime,
    memberWritten,
    onCommentDelete,
    onCommentModify,
}: Props) {
    const [isCommentModifyFormOpen, setIsCommentModifyFormOpen] = useState<boolean>(false);
    const handleCommentModifyFormOpen = useCallback(() => {
        setIsCommentModifyFormOpen(!isCommentModifyFormOpen);
    }, [isCommentModifyFormOpen]);

    return (
        <div className='my-7 flex flex-col'>
            <CommentHeader
                id={id}
                username={username}
                content={content}
                createdTime={createdTime}
                modifiedTime={modifiedTime}
                memberWritten={memberWritten}
                onCommentModifyFormOpen={handleCommentModifyFormOpen}
                onCommentDelete={onCommentDelete}
            />
            {isCommentModifyFormOpen ? (
                <CommentModifyForm
                    id={id}
                    currentCommentContent={content}
                    onCommentModifyFormOpen={handleCommentModifyFormOpen}
                    onCommentModify={onCommentModify}
                />
            ) : (
                <div className='mx-1 my-7'>{content}</div>
            )}
        </div>
    );
}
