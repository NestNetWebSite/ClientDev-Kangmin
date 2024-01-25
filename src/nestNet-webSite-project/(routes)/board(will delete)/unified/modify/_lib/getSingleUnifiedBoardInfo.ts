import axios from 'axios';

export default async function getSingleUnifiedBoardInfo(boardId: string) {
    const response = await axios.get(`/unified-post/${boardId}`, {
        headers: { Authorization: localStorage.getItem('access_token') },
    });
    return response.data.response;
}
