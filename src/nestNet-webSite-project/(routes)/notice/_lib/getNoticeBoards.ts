import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface NoticeBoard {
    id: number;
    title: string;
    createdTime: string;
    viewCount: number;
    likeCount: number;
    userName: string;
}

const example: NoticeBoard[] = [
    {
        id: 1,
        title: '공지사항1',
        createdTime: '2024-01-23T12:14:39.658Z',
        viewCount: 1000,
        likeCount: 1000,
        userName: '관리자',
    },
    {
        id: 2,
        title: '공지사항1',
        createdTime: '2024-01-23T12:14:39.658Z',
        viewCount: 1000,
        likeCount: 1000,
        userName: '관리자',
    },
    {
        id: 3,
        title: '공지사항1',
        createdTime: '2024-01-23T12:14:39.658Z',
        viewCount: 1000,
        likeCount: 1000,
        userName: '관리자',
    },
];

const getNoticeBoards: QueryFunction<
    {
        totalSize: number;
        dtoList: NoticeBoard[];
    } | null,
    [_1: string, _2: { currentPage: number }]
> = async ({ queryKey }) => {
    const { currentPage } = queryKey[1];
    try {
        // return await axios.get(`/notice-post?page=${currentPage - 1}&size=12`).then(response => response.data.response);
        return await new Promise(resolve => resolve({ totalSize: 120, dtoList: example }));
    } catch (error) {
        return null;
    }
};

export default getNoticeBoards;
