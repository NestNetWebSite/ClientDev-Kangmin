import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';
import type { ExamPostInfo } from '../types';

const getSingleBoardInfo: QueryFunction<ExamPostInfo, [_1: string, _2: string]> = async ({ queryKey }) => {
    const [_1, boardId] = queryKey;
    return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}:8080/exam-collection-post/${boardId}`, {
            headers: { Authorization: localStorage.getItem('access_token') },
        })
        .then(response => response.data.response);
};

export default getSingleBoardInfo;
