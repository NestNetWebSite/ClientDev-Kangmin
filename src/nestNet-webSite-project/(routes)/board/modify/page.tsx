import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import UnifiedBoardModifyForm from './_component/UnifiedBoardModifyForm';
import Error404Page from '../../_errors/http404/page';

const response = {
    'is-member-liked': false,
    fileDtoList: [
        {
            id: 44,
            originalFileName: '개발 게시판 테스트 이미지.png',
            saveFileName: 'c4a59409-cc6d-4e9e-84fe-3c2c9affff8f_개발 게시판 테스트 이미지.png',
        },
    ],
    commentResponseList: [],
    unifiedPostDto: {
        id: 63,
        title: '도커 이미지가 뭔가요',
        bodyContent: 'testtesttesttest',
        viewCount: 1,
        likeCount: 0,
        unifiedPostType: 'DEV',
        userName: '테스트2',
        createdTime: [2023, 8, 7, 22, 59, 2, 606474000],
        modifiedTime: null,
        memberWritten: true,
    },
};

export async function unifiedBoardDataLoader() {
    const boardId = window.location.pathname.split('/').at(-1);
    try {
        // return await axios.get(`/unified-post/${boardId}`).then(response => response.data.response);
        return await new Promise(resolve => {
            resolve(response);
        });
    } catch (error) {
        return null;
    }
}

export default function Page() {
    const isBoardExist = !!useLoaderData();
    if (!isBoardExist) {
        return <Error404Page />;
    }

    return (
        <main className={'w-full'}>
            <UnifiedBoardModifyForm />
        </main>
    );
}
