import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { ExamPostInfo } from '../types';

const getSingleExamBoardInfo: QueryFunction<ExamPostInfo, [_1: string, _2: string]> = async ({ queryKey }) => {
    const [_1, boardId] = queryKey;
    try {
        return await axios
            .get(`${process.env.REACT_APP_BACKEND_URL}:8080/exam-collection-post/${boardId}`, {
                headers: { Authorization: localStorage.getItem('access_token') },
            })
            .then(response => response.data.response);
    } catch (error) {
        return null;
    }
};

export default getSingleExamBoardInfo;
