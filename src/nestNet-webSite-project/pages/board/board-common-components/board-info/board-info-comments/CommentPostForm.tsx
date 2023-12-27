import axios from 'axios';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CommentPostForm({ boardId }: { boardId: string }) {
    const [commentContent, setCommentContent] = useState<string>('');
    const queryClient = useQueryClient();

    const { mutate: commentPostMutate } = useMutation({
        mutationFn(content: string) {
            return axios.post(`${process.env.BACKEND_URL}/comment/${boardId}`, { content });
        },

        onSuccess(): void {
            queryClient.invalidateQueries({ queryKey: ['boardInfo'] }).then(() => setCommentContent(''));
        },

        onError(error): void {
            window.alert(error);
        },
    });

    const handleFormSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log(commentContent);
        },
        [commentContent],
    );

    return (
        <form className='mb-6 mt-3 flex w-full flex-col' onSubmit={handleFormSubmit}>
            <textarea
                className='h-[8rem] w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-base shadow-md focus:outline-none'
                value={commentContent}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    setCommentContent(event.target.value);
                }}
                placeholder={'댓글을 작성해주세요.'}
            />
            <div className='mt-5 text-right'>
                <button
                    className='rounded-3xl bg-orange-400 px-4 py-2 text-base font-semibold text-white duration-300 enabled:opacity-100 enabled:hover:scale-105 disabled:cursor-default disabled:opacity-75'
                    type={'submit'}
                    disabled={commentContent.trim().length === 0}
                >
                    댓글 남기기
                </button>
            </div>
        </form>
    );
}
