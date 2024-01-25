import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import { CommentData, FileData, NoticeBoardData } from '../../types';

interface NoticeBoardInfo {
    memberLiked: boolean;
    fileDtoList?: FileData[];
    commentDtoList?: CommentData[];
    noticePostDto: NoticeBoardData;
}

const getSingleNoticeBoardInfo: QueryFunction<NoticeBoardInfo | null, [_1: string, _2: string, _3: string]> = async ({
    queryKey,
}) => {
    const boardId = queryKey[2];
    try {
        return await axios.get(`/notice-post/${boardId}`).then(response => response.data.response);
    } catch (error) {
        return null;
    }
};

export default getSingleNoticeBoardInfo;
