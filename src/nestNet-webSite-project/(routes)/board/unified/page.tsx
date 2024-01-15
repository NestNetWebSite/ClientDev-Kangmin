import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UnifiedBoardCategoryList from './_components/UnifiedBoardCategoryList';
import UnifiedBoardList from './_components/UnifiedBoardList';
import PostsPagination from '../../../_components/PostsPagination';
import BoardAddButton from '../../../_components/BoardAddButton';
import getUnifiedBoards from './_lib/getUnifiedBoards';

const boardListResponse = {
    response: {
        totalSize: 10,
        posts: [
            {
                id: '91',
                username: '테스트',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 9, 13, 22, 10, 15, 705774000],
                viewCount: 2800,
                likeCount: 0,
            },
            {
                id: '92',
                username: '테스트',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 9, 13, 22, 2, 22, 216486000],
                viewCount: 3000,
                likeCount: 0,
            },
            {
                id: '93',
                username: '테스트',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 9, 13, 22, 1, 36, 161038000],
                viewCount: 3002,
                likeCount: 0,
            },
            {
                id: '94',
                username: '매니저',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 24, 16, 20, 26, 207000000],
                viewCount: 9090,
                likeCount: 0,
            },
            {
                id: '95',
                username: '매니저',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 24, 16, 18, 26, 691258000],
                viewCount: 9098,
                likeCount: 0,
            },
            {
                id: '96',
                username: '매니저',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 24, 16, 18, 0, 441057000],
                viewCount: 8888,
                likeCount: 0,
            },
            {
                id: '97',
                username: '매니저',
                title: '도커 이미지가 뭔가요 도커 이미지가 뭔가요 도커 이미지가 뭔가요 도커 이미지가 뭔가요 도커 이미지가 뭔가요',
                createdTime: [2023, 8, 24, 16, 17, 39, 348273000],
                viewCount: 10000,
                likeCount: 0,
            },
            {
                id: '100',
                username: '테스트2',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 7, 22, 59, 2, 606474000],
                viewCount: 10000,
                likeCount: 0,
            },
            {
                id: '101',
                username: '매니저',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 24, 16, 18, 26, 691258000],
                viewCount: 9098,
                likeCount: 0,
            },
            {
                id: '102',
                username: '매니저',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 24, 16, 18, 0, 441057000],
                viewCount: 8888,
                likeCount: 0,
            },
            {
                id: '103',
                username: '매니저',
                title: '도커 이미지가 뭔가요 도커 이미지가 뭔가요 도커 이미지가 뭔가요 도커 이미지가 뭔가요 도커 이미지가 뭔가요',
                createdTime: [2023, 8, 24, 16, 17, 39, 348273000],
                viewCount: 10000,
                likeCount: 0,
            },
            {
                id: '104',
                username: '테스트2',
                title: '도커 이미지가 뭔가요',
                createdTime: [2023, 8, 7, 22, 59, 2, 606474000],
                viewCount: 10000,
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

    const data = useQuery({
        queryKey: ['unifiedBoards', { currentCategory, currentPage }],
        queryFn: getUnifiedBoards,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
    });

    return (
        <>
            <div className={'mx-auto w-[50rem] border-x border-gray-200'}>
                <div
                    className={
                        'sticky top-0 z-[1] flex w-full items-center justify-between border-b border-gray-200 bg-white/70 px-6 py-4 backdrop-blur-md'
                    }
                >
                    <UnifiedBoardCategoryList />
                    <BoardAddButton content={'게시글 작성'} href={'/board/unified/post'} />
                </div>
                {data && (
                    <>
                        <UnifiedBoardList boardList={boardListResponse.response.posts} />
                        <PostsPagination totalItemsCount={120} />
                    </>
                )}
            </div>
        </>
    );
}
