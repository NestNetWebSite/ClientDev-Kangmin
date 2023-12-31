import { pick } from 'lodash';
import UnifiedBoardModifyForm from './_components/UnifiedBoardModifyForm';
import type { BoardInfoResponse } from '../../info/types';

const response: BoardInfoResponse = {
    response: {
        'is-member-liked': false,
        'file-data': [
            {
                id: 44,
                originalFileName: '개발 게시판 테스트 이미지.png',
                saveFileName: 'c4a59409-cc6d-4e9e-84fe-3c2c9affff8f_개발 게시판 테스트 이미지.png',
            },
        ],
        'comment-data': [],
        'post-data': {
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
    },
    error: null,
};

export async function unifiedBoardDataLoader() {
    try {
        return await new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    ...pick(response.response['post-data'], ['title', 'bodyContent', 'unifiedPostType']),
                    existingFileData: response.response['file-data'],
                });
            });
        });
    } catch (error) {
        return null;
    }
}

export default function Page() {
    return (
        <main className={'w-full'}>
            <UnifiedBoardModifyForm />
        </main>
    );
}
