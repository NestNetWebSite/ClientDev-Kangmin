import axios from 'axios';
import { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { debounce } from 'lodash';

interface Props {
    boardId: string;
    isMemberLiked: boolean;
}

export default function BoardLikeButton({ boardId, isMemberLiked }: Props) {
    const queryClient = useQueryClient();

    // state 상태인 쿼리의 데이터를 queryClient.set 하면 컴포넌트 리렌더링됨
    // 반면에 inactive 상태인 쿼리의 데이터를 queryClient.set 해도 컴포넌트 리렌더링 안됨
    // (둘다 테스트해봄)
    const [oldData, setOldData] = useState<boolean | undefined>(undefined);
    const { data } = useQuery({
        queryKey: ['likeState'],
        queryFn() {
            return Promise.resolve(isMemberLiked);
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        gcTime: 0,
    });

    const { mutate } = useMutation({
        mutationFn() {
            const likeState = queryClient.getQueryData(['likeState']);
            return axios
                .post(
                    `/post/${likeState ? 'like' : 'cancel-like'}`,
                    { postId: boardId },
                    { withCredentials: true, headers: { Authorization: localStorage.getItem('access_token') } },
                )
                .then(response => {
                    console.log(response.data.response);
                    queryClient.setQueryData(['likeCount'], response.data.response);
                });
        },

        onSuccess() {
            return queryClient.invalidateQueries({ queryKey: ['post'] });
        },

        onError() {
            queryClient.setQueryData(['likeState'], oldData);
        },
    });

    const debouncedMutate = debounce(mutate, 1000);

    const handleButtonClick = useCallback(async (): Promise<void> => {
        await queryClient.cancelQueries({ queryKey: ['likeState'] });
        const previousLikeState = queryClient.getQueryData(['likeState']);
        queryClient.setQueryData(['likeState'], !previousLikeState);
        debouncedMutate();
    }, []);

    return (
        <button
            type={'button'}
            className={
                'flex w-32 items-center justify-center gap-x-3.5 rounded-3xl border border-gray-100 py-3 shadow-lg transition-all hover:scale-105'
            }
            onClick={() => {
                handleButtonClick().catch(reason => console.error(reason));
            }}
        >
            {data ? <FaHeart className={'h-6 w-6 text-red-500'} /> : <FaRegHeart className={'h-6 w-6'} />}
            <span className={'text-base'}>좋아요</span>
        </button>
    );
}
