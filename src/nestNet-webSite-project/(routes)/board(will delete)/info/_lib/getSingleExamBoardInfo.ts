import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { ExamPostInfo } from '../types';

const getSingleExamBoardInfo: QueryFunction<ExamPostInfo, [_1: string, _2: string]> = async ({ queryKey }) => {
    const [_1, boardId] = queryKey;
    try {
        return await axios
            .get(`/exam-collection-post/${boardId}`, {
                withCredentials: true,
                headers: { Authorization: localStorage.getItem('access_token') },
            })
            .then(response => response.data.response);
    } catch (error) {
        return null;
    }
};

export default getSingleExamBoardInfo;
