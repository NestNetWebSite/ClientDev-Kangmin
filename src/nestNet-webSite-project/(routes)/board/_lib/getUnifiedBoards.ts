import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface UnifiedBoard {
    id: string | number;
    username: string;
    title: string;
    createdTime: number[];
    viewCount: number;
    likeCount: number;
}

const unifiedBoards: UnifiedBoard[] = [
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
];

const getUnifiedBoards: QueryFunction<
    {
        totalSize: number;
        dtoList: UnifiedBoard[];
    } | null,
    [_1: string, _2: { currentCategory: string; currentPage: number }]
> = async ({ queryKey }) => {
    const { currentCategory, currentPage } = queryKey[1];
    try {
        // return await axios.get(
        //     `/unified-post?post-type=${currentCategory.toUpperCase()}&page=${currentPage - 1}&size=12`,
        // );
        return await new Promise(resolve => {
            resolve({ totalSize: 120, dtoList: unifiedBoards });
        });
    } catch (error) {
        return null;
    }
};

export default getUnifiedBoards;
