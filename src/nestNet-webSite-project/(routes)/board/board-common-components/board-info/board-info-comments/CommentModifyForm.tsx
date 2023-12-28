import { ChangeEvent, useCallback, useState } from 'react';

interface Props {
    id: number;
    currentCommentContent: string;
    onCommentModifyFormOpen(): void;
    onCommentModify(id: number, newContent: string): void;
}

export default function CommentModifyForm({
    id,
    currentCommentContent,
    onCommentModifyFormOpen,
    onCommentModify,
}: Props) {
    const [newCommentContent, setNewCommentContent] = useState<string>(currentCommentContent);

    const handleFormSubmit = useCallback(
        (event: ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();
            onCommentModifyFormOpen();
            onCommentModify(id, newCommentContent);
        },
        [newCommentContent],
    );

    return (
        <form className='my-5 flex w-full flex-col' onSubmit={handleFormSubmit}>
            <textarea
                className='h-[5rem] resize-none rounded-xl border border-gray-200 px-4 py-3 shadow-md focus:outline-none'
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    setNewCommentContent(event.target.value);
                }}
                placeholder={'새로운 댓글을 작성해주세요.'}
                value={newCommentContent}
            />
            <div className='text-right'>
                <button
                    className='mt-4 rounded-xl bg-orange-400 px-3 py-1 text-sm font-semibold text-white duration-300 enabled:opacity-100 enabled:hover:scale-105 disabled:cursor-default disabled:opacity-75'
                    type={'submit'}
                    disabled={newCommentContent.trim().length === 0}
                >
                    댓글 수정
                </button>
            </div>
        </form>
    );
}
