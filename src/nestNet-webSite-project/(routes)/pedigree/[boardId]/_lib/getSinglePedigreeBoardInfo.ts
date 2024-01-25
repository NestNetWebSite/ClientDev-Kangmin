import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { CommentData, FileData, PedigreeBoardData } from '../../types';

interface PedigreeBoardInfo {
    memberLiked: boolean;
    fileDtoList?: FileData[];
    commentDtoList?: CommentData[];
    examCollectionPostDto: PedigreeBoardData;
}

const getSinglePedigreeBoardInfo: QueryFunction<
    PedigreeBoardInfo | null,
    [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
    const boardId = queryKey[2];
    try {
        return await axios.get(`/exam-collection-post/${boardId}`).then(response => response.data.response);
    } catch (error) {
        return null;
    }
};

export default getSinglePedigreeBoardInfo;
