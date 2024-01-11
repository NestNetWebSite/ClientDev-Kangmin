import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useExamSearchFilterStore from '../../../_stores/useExamSearchFilterStore';
import SearchFilterArea from './_components/SearchFilterArea';
import BoardList from './_components/BoardList';
import PostsPagination from '../_components/PostsPagination';
import ExamBoardAddButton from './_components/ExamBoardAddButton';
import getExamPosts from './_lib/getExamPosts';

interface ExamSearchFilter {
    year: number;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

export default function Component() {
    const { examSearchFilter, filterReset } = useExamSearchFilterStore();
    const [currentSearchFilter, setCurrentSearchFilter] = useState(examSearchFilter);
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? 1);

    const updateCurrentSearchFilter = useCallback((newSearchFilter: ExamSearchFilter) => {
        setCurrentSearchFilter(newSearchFilter);
    }, []);

    useEffect(() => {
        return () => {
            if (window.location.pathname.includes('/board/exam')) {
                return;
            }
            filterReset();
        };
    }, []);

    const { data } = useQuery({
        queryKey: ['examList', { ...examSearchFilter, currentPage }],
        queryFn: getExamPosts,
        retry: false,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <div className='mx-auto mt-4 w-[70rem]'>
                <SearchFilterArea
                    currentSearchFilter={currentSearchFilter}
                    updateCurrentSearchFilter={updateCurrentSearchFilter}
                />
                <BoardList boardList={data?.examPosts} />
                <PostsPagination totalItemsCount={120} />
            </div>
            <ExamBoardAddButton />
        </>
    );
}
