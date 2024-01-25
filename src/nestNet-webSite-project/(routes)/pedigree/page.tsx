import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useExamSearchFilterStore from '../../_stores/useExamSearchFilterStore';
import SearchFilterArea from './_components/SearchFilterArea';
import PedigreeBoardList from './_components/PedigreeBoardList';
import BoardsPagination from '../../_components/BoardsPagination';
import BoardAddButton from '../../_components/BoardAddButton';
import getPedigreeBoards from './_lib/getPedigreeBoards';
import { isEqual } from 'lodash';

interface ExamSearchFilter {
    year: string;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

export default function Page() {
    const { examSearchFilter, filterReset } = useExamSearchFilterStore();
    const [currentSearchFilter, setCurrentSearchFilter] = useState<ExamSearchFilter>(examSearchFilter);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? 1);

    const updateCurrentSearchFilter = useCallback(
        (newSearchFilter: ExamSearchFilter) => {
            if (isEqual(newSearchFilter, currentSearchFilter)) {
                return;
            }
            setSearchParams({ page: '1' });
            setCurrentSearchFilter(newSearchFilter);
        },
        [currentSearchFilter],
    );

    useEffect(() => {
        return () => {
            if (window.location.pathname.includes('/pedigree')) {
                return;
            }
            filterReset();
        };
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ['examBoards', { ...currentSearchFilter, currentPage }],
        queryFn: getPedigreeBoards,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
    });

    if (isLoading) {
        return null;
    }

    // w-[70rem] -> 기존
    // w-[50rem]
    return (
        <>
            <div className='relative mx-auto flex h-[calc(100dvh-4.68rem)] w-[50rem] flex-col overflow-y-auto border-x border-gray-200 scrollbar-hide'>
                <div
                    className={
                        'sticky top-0 z-[1] flex w-full items-center justify-between gap-x-1 border-b border-gray-200 bg-white/70 px-6 py-4 backdrop-blur-md'
                    }
                >
                    <SearchFilterArea
                        currentSearchFilter={currentSearchFilter}
                        updateCurrentSearchFilter={updateCurrentSearchFilter}
                    />
                    <BoardAddButton content={'게시글 작성'} href={'/pedigree/post'} />
                </div>
                {data && data.totalSize !== 0 ? (
                    <>
                        <PedigreeBoardList pedigreeBoardList={data.dtoList} />
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
