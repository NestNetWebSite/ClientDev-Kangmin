import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import NoticeModifyForm from './_component/NoticeModifyForm';
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
    noticePostDto: {
        id: 1,
        title: '안녕하세요.',
        bodyContent: '안녕하세요.',
        viewCount: 1000,
        likeCount: 1000,
        userName: '테스트',
        createdTime: '2024-01-23T12:14:39.658Z',
        modifiedTime: null,
        memberWritten: true,
    },
};

export async function noticeBoardLoader() {
    const boardId = window.location.pathname.split('/').at(-1);
    try {
        // return await axios.get(`/notice-post/${boardId}`).then(response => response.data.response);
        return await new Promise(resolve => resolve(response));
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
            <NoticeModifyForm />
        </main>
    );
}
