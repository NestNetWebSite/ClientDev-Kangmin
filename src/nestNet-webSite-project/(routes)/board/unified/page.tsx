import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BoardCategories from './_components/BoardCategories';
import BoardList from './_components/BoardList';
import BoardPagination from '../board-common-components/BoardPagination';
import UnifiedBoardAddButton from './_components/UnifiedBoardAddButton';
import type { UnifiedBoardListResponse } from './types';

const boardListResponse: UnifiedBoardListResponse = {
    response: {
        totalSize: 10,
        posts: [
            {
                id: '91',
                username: '테스트',
                title: 'd',
                createdTime: [2023, 9, 13, 22, 10, 15, 705774000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '92',
                username: '테스트',
                title: 'd',
                createdTime: [2023, 9, 13, 22, 2, 22, 216486000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '93',
                username: '테스트',
                title: 'd',
                createdTime: [2023, 9, 13, 22, 1, 36, 161038000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '94',
                username: '매니저',
                title: 'd',
                createdTime: [2023, 8, 24, 16, 20, 26, 207000000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '95',
                username: '매니저',
                title: 'd',
                createdTime: [2023, 8, 24, 16, 18, 26, 691258000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '96',
                username: '매니저',
                title: 'd',
                createdTime: [2023, 8, 24, 16, 18, 0, 441057000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '97',
                username: '매니저',
                title: 'd',
                createdTime: [2023, 8, 24, 16, 17, 39, 348273000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '98',
                username: '매니저',
                title: 'd',
                createdTime: [2023, 8, 24, 16, 15, 44, 742158000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '99',
                username: '매니저',
                title: 'd',
                createdTime: [2023, 8, 24, 16, 13, 2, 645280000],
                viewCount: 0,
                likeCount: 0,
            },
            {
                id: '100',
                username: '테스트2',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 7, 22, 59, 2, 606474000],
                viewCount: 0,
                likeCount: 0,
            },
        ],
    },
    error: null,
};

export default function Component() {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');
    const currentCategory = searchParams.get('category') ?? 'free';

    useQuery({
        queryKey: ['unifiedBoardList', `filter -> current_page: ${currentPage}, current_category: ${currentCategory}`],
        queryFn() {
            return Promise.resolve(Math.trunc(Math.random() * 10000));
        },
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
    });

    return (
        <>
            <div>
                <BoardList boardList={boardListResponse.response.posts} />
                <BoardPagination totalItemsCount={120} />
            </div>
            <UnifiedBoardAddButton />
        </>
    );
}
