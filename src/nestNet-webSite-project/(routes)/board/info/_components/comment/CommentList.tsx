import axios from 'axios';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';
import type { CommentData } from '../../types';

export default function ({ comments }: { comments: CommentData[] }) {
    const queryClient = useQueryClient();
    const { mutate: commentDeleteMutate } = useMutation({
        mutationFn(id: number) {
            return axios.delete(`${process.env.BACKEND_URL}/comment/delete/${id}`);
        },

        onSuccess(): void {
            queryClient.invalidateQueries({ queryKey: ['boardInfo'] }).catch(error => window.alert(error));
        },

        onError(error): void {
            window.alert(error);
        },
    });

    const { mutate: commentModifyMutate } = useMutation({
        mutationFn({ id, newContent }: { id: number; newContent: string }) {
            return axios.post(
                `${process.env.BACKEND_URL}/comment/modify/${id}`,
                { content: newContent },
                { withCredentials: true },
            );
        },

        onSuccess(): void {
            queryClient.invalidateQueries({ queryKey: ['boardInfo'] }).catch(error => window.alert(error));
        },

        onError(error): void {
            window.alert(error);
        },
    });

    const handleCommentDelete = useCallback((id: number) => {
        commentDeleteMutate(id);
    }, []);

    const handleCommentModify = useCallback((id: number, newContent: string) => {
        commentModifyMutate({ id, newContent });
    }, []);

    return (
        <div>
            {comments.map(comment => {
                return (
                    <Comment
                        key={comment.id}
                        id={comment.id}
                        username={comment.username}
                        content={comment.content}
                        createdTime={comment.createdTime}
                        modifiedTime={comment.modifiedTime}
                        memberWritten={comment.memberWritten}
                        onCommentDelete={handleCommentDelete}
                        onCommentModify={handleCommentModify}
                    />
                );
            })}
        </div>
    );
}
