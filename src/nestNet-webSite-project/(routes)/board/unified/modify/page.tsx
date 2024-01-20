import { Navigate, useLoaderData } from 'react-router-dom';
import UnifiedBoardModifyForm from './_components/UnifiedBoardModifyForm';
import getSingleUnifiedBoardInfo from './_lib/getSingleUnifiedBoardInfo';

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
        // return await getSingleUnifiedBoardInfo(boardId);
        return await new Promise(resolve => {
            setTimeout(() => resolve(response));
        });
    } catch (error) {
        return null;
    }
}

export default function Page() {
    const boardId = window.location.pathname.split('/').at(-1);
    if (useLoaderData() === null) {
        window.alert('에러가 발생하였습니다. 관리자에게 문의해 주세요.');
        return <Navigate to={`/board/unified/${boardId}`} replace />;
    }
    return (
        <main className={'w-full'}>
            <UnifiedBoardModifyForm />
        </main>
    );
}
