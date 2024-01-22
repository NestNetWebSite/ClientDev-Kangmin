import getSingleExamBoardInfo from './_lib/getSingleExamBoardInfo';
import ExamBoardModifyForm from './_components/ExamBoardModifyForm';
import { useLoaderData } from 'react-router-dom';
import Error404Page from '../../../_errors/http404/page';

const response = {
    'is-member-liked': false,
    fileDtoList: [
        {
            id: 31,
            originalFileName: '수료증명서.pdf',
            saveFileName: '2643e73e-b978-429c-b7d9-c8f6e09876de_수료증명서.pdf',
        },
    ],
    commentResponseList: [
        {
            id: 3,
            username: '테스트',
            content: '테스트로 작성한 댓글1',
            createdTime: [2023, 7, 31, 21, 22, 57, 981096000],
            modifiedTime: null,
            memberWritten: false,
        },
        {
            id: 4,
            username: '테스트',
            content: '테스트로 작성한 댓글2',
            createdTime: [2023, 7, 31, 21, 23, 1, 469345000],
            modifiedTime: null,
            memberWritten: false,
        },
        {
            id: 5,
            username: '테스트',
            content: '테스트로 작성한 댓글3',
            createdTime: [2023, 7, 31, 21, 23, 5, 192934000],
            modifiedTime: null,
            memberWritten: false,
        },
    ],
    examCollectionPostDto: {
        id: 47,
        title: '2023년도 1학기 자료구조 이의종',
        bodyContent: '<p>test</p>',
        viewCount: 49,
        likeCount: 1,
        subject: '자료구조',
        professor: '이의종',
        year: 2023,
        semester: 1,
        examType: 'MID',
        userName: '테스트',
        createdTime: [2023, 7, 31, 20, 22, 24, 936258000],
        modifiedTime: null,
        memberWritten: false,
    },
};

export async function examBoardDataLoader() {
    const boardId = window.location.pathname.split('/').at(-1);
    try {
        // return await getSingleExamBoardInfo(boardId);
        return await new Promise((resolve, reject) => {
            setTimeout(() => resolve(response), 1000);
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
            <ExamBoardModifyForm />
        </main>
    );
}
