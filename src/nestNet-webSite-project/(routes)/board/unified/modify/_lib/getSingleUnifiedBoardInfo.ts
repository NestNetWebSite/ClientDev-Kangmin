import axios from 'axios';

export default async function getSingleUnifiedBoardInfo(boardId: string) {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}:8080//${boardId}`, {
        headers: { Authorization: localStorage.getItem('access_token') },
    });
    return response.data.response;
}
