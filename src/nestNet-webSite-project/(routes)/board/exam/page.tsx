import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useExamSearchFilterStore from '../../../_stores/useExamSearchFilterStore';
import SearchFilterArea from './_components/SearchFilterArea';
import BoardList from './_components/BoardList';
import BoardPagination from '../_components/BoardPagination';
import ExamBoardAddButton from './_components/ExamBoardAddButton';
import type { ExamBoardListResponse } from './types';

interface ExamSearchFilterType {
    year: number;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

const boardListResponse: ExamBoardListResponse = {
    response: {
        totalSize: 20,
        posts: [
            {
                id: 103,
                subject: 'd',
                professor: 'd',
                year: 2023,
                semester: 2,
                examType: 'MID',
                userName: '테스트',
            },
            {
                id: 92,
                subject: '자료구조',
                professor: '이의종',
                year: 2023,
                semester: 2,
                examType: 'MID',
                userName: '매니저',
            },
            {
                id: 91,
                subject: '자료구조',
                professor: '이의종',
                year: 2023,
                semester: 2,
                examType: 'MID',
                userName: '매니저',
            },
            {
                id: 81,
                subject: '자료구조',
                professor: '이의종',
                year: 2023,
                semester: 1,
                examType: 'MID',
                userName: '매니저',
            },
            {
                id: 79,
                subject: '자료구조',
                professor: '이의종',
                year: 2023,
                semester: 1,
                examType: 'MID',
                userName: '매니저',
            },
            {
                id: 47,
                subject: '자료구조',
                professor: '이의종',
                year: 2023,
                semester: 1,
                examType: 'MID',
                userName: '테스트',
            },
            {
                id: 35,
                subject: '객체지향프로그래',
                professor: '최경',
                year: 2023,
                semester: 1,
                examType: 'MID',
                userName: '테스트',
            },
            {
                id: 34,
                subject: '운영체제',
                professor: '조희승',
                year: 2023,
                semester: 1,
                examType: 'MID',
                userName: '테스트',
            },
            {
                id: 33,
                subject: '운영체제',
                professor: '조희승',
                year: 2023,
                semester: 1,
                examType: 'MID',
                userName: '테스트',
            },
        ],
    },
    error: null,
};

export default function Component() {
    const { examSearchFilter, filterReset } = useExamSearchFilterStore();
    const [currentSearchFilter, setCurrentSearchFilter] = useState(examSearchFilter);
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? 1);
    const { year, semester, examType, subject, professor } = currentSearchFilter;

    const handleCurrentSearchFilterSet = useCallback((newSearchFilter: ExamSearchFilterType) => {
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

    useQuery({
        queryKey: [
            'examList ',
            `filter -> year: ${year}, semester: ${semester}, examType: ${examType}, subject: ${subject}, professor: ${professor}, currentPage: ${currentPage}`,
        ],
        queryFn() {
            return Promise.resolve(Math.trunc(Math.random() * 100000));
        },
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
    });

    return (
        <>
            <div className='mx-auto mt-4 w-[70rem]'>
                <SearchFilterArea
                    currentSearchFilter={currentSearchFilter}
                    onSearchFilterSet={handleCurrentSearchFilterSet}
                />
                <BoardList boardList={boardListResponse.response.posts} />
                <BoardPagination totalItemsCount={120} />
            </div>
            <ExamBoardAddButton />
        </>
    );
}
