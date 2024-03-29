import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getUnifiedBoards from './_lib/getUnifiedBoards';
import UnifiedBoardCategoryList from './_components/UnifiedBoardCategoryList';
import BoardAddButton from '../../_components/BoardAddButton';

import BoardsPagination from '../../_components/BoardsPagination';
import UnifiedBoardList from './_components/UnifiedBoardList';

export default function Page() {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');
    const currentCategory = searchParams.get('category') ?? 'free';

    const { data, isLoading } = useQuery({
        queryKey: ['unifiedBoards', { currentCategory, currentPage }],
        queryFn: getUnifiedBoards,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
    });

    if (isLoading) {
        return null;
    }

    console.log(data);

    return (
        <>
            <div
                className={
                    'mx-auto h-[calc(100dvh-4.68rem)] w-[50rem] overflow-y-auto border-x border-gray-200 scrollbar-hide'
                }
            >
                <div
                    className={
                        'sticky top-0 z-[1] flex w-full items-center justify-between border-b border-gray-200 bg-white/70 px-6 py-4 backdrop-blur-md'
                    }
                >
                    <UnifiedBoardCategoryList />
                    <BoardAddButton content={'게시글 작성'} href={'/board/post'} />
                </div>
                {data && data.totalSize !== 0 ? (
                    <>
                        <UnifiedBoardList unifiedBoardList={data.dtoList} />
                        <BoardsPagination totalItemsCount={data.totalSize} />
                    </>
                ) : (
                    <div className={'relative flex-1'}>
                        <span
                            className={
                                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-600'
                            }
                        >
                            게시글이 존재하지 않습니다.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
