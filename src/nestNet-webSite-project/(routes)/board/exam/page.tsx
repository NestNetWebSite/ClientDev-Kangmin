import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useExamSearchFilterStore from '../../../_stores/useExamSearchFilterStore';
import SearchFilterArea from './_components/SearchFilterArea';
import ExamBoardList from './_components/ExamBoardList';
import PostsPagination from '../../../_components/PostsPagination';
import ExamBoardAddButton from './_components/ExamBoardAddButton';
import getExamBoards from './_lib/getExamBoards';
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
            if (window.location.pathname.includes('/board/exam')) {
                return;
            }
            filterReset();
        };
    }, []);

    const { data } = useQuery({
        queryKey: ['examList', { ...currentSearchFilter, currentPage }],
        queryFn: getExamBoards,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
    });

    return (
        <>
            <div className='relative mx-auto w-[70rem] border-x border-gray-200'>
                <SearchFilterArea
                    currentSearchFilter={currentSearchFilter}
                    updateCurrentSearchFilter={updateCurrentSearchFilter}
                />
                {data && (
                    <>
                        <ExamBoardList boardList={data.dtoList} />
                        <PostsPagination totalItemsCount={data.totalSize} />
                    </>
                )}
            </div>
            <ExamBoardAddButton />
        </>
    );
}
