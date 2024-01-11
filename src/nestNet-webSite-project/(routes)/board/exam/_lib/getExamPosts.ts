import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface ExamPost {
    id: number;
    subject: string;
    professor: string;
    year: number;
    semester: number;
    examType: string;
    userName: string;
}

interface ExamPostSearchFilter {
    year: number;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
    currentPage: number;
}

const examPosts: ExamPost[] = [
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
];

const getExamPosts: QueryFunction<
    {
        totalSize: number;
        examPosts: ExamPost[];
    },
    [_1: string, searchfilter: ExamPostSearchFilter]
> = ({ queryKey }) => {
    const [_, searchFilter] = queryKey;
    console.log(searchFilter);

    // axios 로 데이터 가져오기
    return Promise.resolve({ totalSize: 20, examPosts });
};

export default getExamPosts;
