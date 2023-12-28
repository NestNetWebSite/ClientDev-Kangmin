import axios from 'axios';
import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaRegComments } from 'react-icons/fa';
import BoardHeader from './board-info-header/BoardHeader';
import BoardMain from './board-info-main/BoardMain';
import FileList from './board-info-files/FileList';
import BoardLikeButton from './BoardLikeButton';
import CommentPostForm from './board-info-comments/CommentPostForm';
import CommentList from './board-info-comments/CommentList';
import type { BoardInfoResponse } from './types';

const response: BoardInfoResponse = {
    response: {
        'is-member-liked': true,
        'file-data': [
            {
                id: 31,
                originalFileName: '수료증명서.pdf',
                saveFileName: '2643e73e-b978-429c-b7d9-c8f6e09876de_수료증명서.pdf',
            },
        ],
        'comment-data': [
            {
                id: 3,
                username: '테스트',
                content: '테스트로 작성한 댓글1',
                createdTime: [2023, 7, 31, 21, 22, 57, 981096000],
                modifiedTime: null,
                memberWritten: true,
            },
            {
                id: 4,
                username: '테스트',
                content: '테스트로 작성한 댓글2',
                createdTime: [2023, 7, 31, 21, 23, 1, 469345000],
                modifiedTime: null,
                memberWritten: true,
            },
            {
                id: 5,
                username: '테스트',
                content: '테스트로 작성한 댓글3',
                createdTime: [2023, 7, 31, 21, 23, 5, 192934000],
                modifiedTime: null,
                memberWritten: true,
            },
        ],
        'post-data': {
            id: 47,
            title: '2023년도 1학기 자료구조 이의종',
            bodyContent: 'test',
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
    },
    error: null,
};

const response2: BoardInfoResponse = {
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

export default function BoardInfo() {
    const { id: boardId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // 나중에 의존성 배열에 useQuery 로 받아온 데이터 push 해야함. ( response pop 하고 )
    const handleModifyTextClick = useCallback(() => {
        const boardType = location.pathname.split('/')[2];
        if (boardType === 'unified') {
            const { title, unifiedPostType, bodyContent } = response2.response['post-data'];
            navigate(`/board/unified/modify?boardId=${boardId}`, {
                state: {
                    title,
                    unifiedPostType,
                    bodyContent,
                    existingFileData: response2.response['file-data'],
                },
            });
        } else {
            const { title, bodyContent, subject, professor, year, semester, examType } = response.response['post-data'];
            navigate(`/board/exam/modify?boardId=${boardId}`, {
                state: {
                    title,
                    bodyContent,
                    subject,
                    professor,
                    year,
                    semester,
                    examType,
                    existingFileData: response.response['file-data'],
                },
            });
        }
    }, [response]);

    // 위와 동일
    const handleDeleteTextClick = useCallback(() => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios
                .delete(`${process.env.BACKEND_URL}/exam-collection-post/delete?postId=${boardId}`, {
                    withCredentials: true,
                })
                .then(() => navigate('/board/exam'))
                .catch((error) => window.alert(error));
        }
    }, [response]);

    return (
        <div className='mx-auto mt-24 flex w-[50rem] flex-col p-8'>
            <div className='flex flex-col'>
                <BoardHeader
                    title={response.response['post-data'].title}
                    username={response.response['post-data'].userName}
                    viewCount={response.response['post-data'].viewCount}
                    likeCount={response.response['post-data'].likeCount}
                    createdTime={response.response['post-data'].createdTime}
                    modifiedTime={response.response['post-data'].modifiedTime}
                    onModifyTextClick={handleModifyTextClick}
                    onDeleteTextClick={handleDeleteTextClick}
                    memberWritten={response.response['post-data'].memberWritten}
                />
                <hr />
                <BoardMain bodyContent={response.response['post-data'].bodyContent} />
                <FileList files={response.response['file-data']} />
                <div>
                    <BoardLikeButton boardId={boardId} isMemberLiked={response.response['is-member-liked']} />
                </div>
                <hr />
                <div>
                    <div className='mt-8 flex items-center'>
                        <h4 className='mx-2 text-lg font-bold'>댓글</h4>
                        <FaRegComments className='mx-1 h-6 w-6' />
                    </div>
                    <CommentPostForm boardId={boardId} />
                    <CommentList comments={response.response['comment-data']} />
                </div>
            </div>
        </div>
    );
}
