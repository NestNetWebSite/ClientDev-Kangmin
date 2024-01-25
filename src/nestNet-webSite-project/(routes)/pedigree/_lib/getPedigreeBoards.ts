import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface PedigreeBoard {
    id: number;
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    userName: string;
}

interface ExamPostSearchFilter {
    year: string;
    semester: string | number;
    examType: string;
    subject: string;
    professor: string;
    currentPage: number;
}

const examPosts: PedigreeBoard[] = [
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
        examType: 'FINAL',
        userName: '매니저',
    },
    {
        id: 79,
        subject: '자료구조',
        professor: '이의종',
        year: 2023,
        semester: 1,
        examType: 'FINAL',
        userName: '매니저',
    },
    {
        id: 47,
        subject: '자료구조',
        professor: '이의종',
        year: 2023,
        semester: 1,
        examType: 'FINAL',
        userName: '테스트',
    },
    {
        id: 35,
        subject: '객체지향프로그래',
        professor: '최경',
        year: 2023,
        semester: 1,
        examType: 'FINAL',
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
        examType: 'FINAL',
        userName: '테스트',
    },
    {
        id: 100,
        subject: '객체지향프로그래',
        professor: '최경',
        year: 2023,
        semester: 1,
        examType: 'FINAL',
        userName: '테스트',
    },
    {
        id: 101,
        subject: '운영체제',
        professor: '조희승',
        year: 2023,
        semester: 1,
        examType: 'MID',
        userName: '테스트',
    },
    {
        id: 102,
        subject: '운영체제',
        professor: '조희승',
        year: 2023,
        semester: 1,
        examType: 'FINAL',
        userName: '테스트',
    },
];

const getPedigreeBoards: QueryFunction<
    {
        totalSize: number;
        dtoList: PedigreeBoard[];
    } | null,
    [_1: string, searchfilter: ExamPostSearchFilter]
> = async ({ queryKey }) => {
    const [_, searchFilter] = queryKey;

    const { year, semester, examType, subject, professor, currentPage } = searchFilter;
    // try {
    //     return await axios
    //         .get(
    //             `/exam-collection-post?${Number(year) === 0 ? '' : `year=${year}&`}${
    //                 Number(semester) === 0 ? '' : `semester=${semester}&`
    //             }${examType === '' ? '' : `examType=${examType}&`}${subject === '' ? '' : `subject=${subject}&`}${
    //                 professor === '' ? '' : `professor=${professor}&`
    //             }page=${currentPage - 1}&size=9`,
    //         )
    //         .then(response => response.data.response);
    // } catch (error) {
    //     return null;
    // }

    return Promise.resolve({ totalSize: 45, dtoList: examPosts });
};

export default getPedigreeBoards;
