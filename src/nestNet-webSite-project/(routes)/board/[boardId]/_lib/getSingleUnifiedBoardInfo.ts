import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { CommentData, FileData, UnifiedBoardData } from '../../types';

interface UnifiedBoardInfo {
    memberLiked: boolean;
    fileDtoList?: FileData[];
    commentDtoList?: CommentData[];
    unifiedPostDto: UnifiedBoardData;
}

const getSingleUnifiedBoardInfo: QueryFunction<UnifiedBoardInfo | null, [_1: string, _2: string, _3: string]> = async ({
    queryKey,
}) => {
    const boardId = queryKey[2];
    try {
        return await axios.get(`/unified-post/${boardId}`).then(response => response.data.response);
    } catch (error) {
        return null;
    }
};

export default getSingleUnifiedBoardInfo;
