import axios from 'axios';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegComments } from 'react-icons/fa';
import BoardHeader from './_components/header/BoardHeader';
import BoardBody from './_components/body/BoardBody';
import FileList from './_components/file/FileList';
import BoardLikeButton from './_components/BoardLikeButton';
import CommentPostForm from './_components/comment/CommentPostForm';
import CommentList from './_components/comment/CommentList';
import type { BoardInfoResponse } from './types';
import { QueryClient, useQuery } from '@tanstack/react-query';
import getSingleBoardInfo from './_lib/getSingleBoardInfo';

const response: BoardInfoResponse = {
    response: {
        memberLiked: true,
        fileDtoList: [
            {
                id: 31,
                originalFileName: '수료증명서.pdf',
                saveFileName: '2643e73e-b978-429c-b7d9-c8f6e09876de_수료증명서.pdf',
            },
        ],
        commentDtoList: [
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
        examCollectionPostDto: {
            id: 47,
            title: '2023년도 1학기 자료구조 이의종',
            bodyContent: 'test',
            viewCount: 4900,
            likeCount: 1000,
            subject: '자료구조',
            professor: '이의종',
            year: 2023,
            semester: 1,
            examType: 'MID',
            userName: '테스트',
            createdTime: [2023, 7, 31, 20, 22, 24, 936258000],
            modifiedTime: null,
            memberWritten: true,
        },
    },
    error: null,
};

const response2: BoardInfoResponse = {
    response: {
        memberLiked: true,
        fileDtoList: [
            {
                id: 44,
                originalFileName: '개발 게시판 테스트 이미지.png',
                saveFileName: 'c4a59409-cc6d-4e9e-84fe-3c2c9affff8f_개발 게시판 테스트 이미지.png',
            },
            {
                id: 44,
                originalFileName: '개발 게시판 테스트 이미지.png',
                saveFileName: 'c4a59409-cc6d-4e9e-84fe-3c2c9affff8f_개발 게시판 테스트 이미지.png',
            },
        ],
        commentDtoList: [],
        examCollectionPostDto: {
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

interface Props {
    boardId: string;
}

export default function Page({ boardId }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const boardType = location.pathname.split('/')[2];
    const queryClient = new QueryClient();

    const { data, isSuccess, isFetched } = useQuery({
        queryKey: ['post', { boardId, boardType }],
        queryFn: getSingleBoardInfo,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const handleModifyTextClick = useCallback(() => {
        const boardType = location.pathname.split('/')[2];
        navigate(`/board/${boardType}/modify/${boardId}`);
    }, []);

    const handleDeleteTextClick = useCallback(() => {
        if (window.confirm('삭제하시겠습니까?')) {
            axios
                .delete(`/post/delete?postId=${boardId}`, {
                    withCredentials: true,
                    headers: { Authorization: localStorage.getItem('access_token') },
                })
                .then(() => {
                    navigate(`/board/${boardType}`);
                })
                .catch(error => window.alert(error));
        }
    }, []);

    return (
        data && (
            <div className='mx-auto mt-5 flex w-[50rem] flex-col p-8'>
                <div className='flex flex-col'>
                    <BoardHeader
                        title={boardType === 'unified' ? data.unifiedPostDto.title : data.examCollectionPostDto.title}
                        username={
                            boardType === 'unified' ? data.unifiedPostDto.userName : data.examCollectionPostDto.userName
                        }
                        viewCount={
                            boardType === 'unified'
                                ? data.unifiedPostDto.viewCount
                                : data.examCollectionPostDto.viewCount
                        }
                        likeCount={queryClient.getQueryData(['likeCount'])}
                        createdTime={
                            boardType === 'unified'
                                ? data.unifiedPostDto.createdTime
                                : data.examCollectionPostDto.createdTime
                        }
                        modifiedTime={
                            boardType === 'unified'
                                ? data.unifiedPostDto.modifiedTime
                                : data.examCollectionPostDto.modifiedTime
                        }
                        onModifyTextClick={handleModifyTextClick}
                        onDeleteTextClick={handleDeleteTextClick}
                        memberWritten={
                            boardType === 'unified'
                                ? data.unifiedPostDto.memberWritten
                                : data.examCollectionPostDto.memberWritten
                        }
                    />
                    <hr />
                    <BoardBody
                        bodyContent={
                            boardType === 'unified'
                                ? data.unifiedPostDto.bodyContent
                                : data.examCollectionPostDto.bodyContent
                        }
                    />
                    <FileList files={data.fileDtoList} />
                    <div className={'mb-9 flex justify-center'}>
                        <BoardLikeButton boardId={boardId} isMemberLiked={data.memberLiked} />
                    </div>
                    <hr />
                    <div>
                        <div className='mt-8 flex items-center'>
                            <h4 className='mx-2 text-lg font-bold'>댓글</h4>
                            <FaRegComments className='mx-1 h-6 w-6' />
                        </div>
                        <CommentPostForm boardId={boardId} />
                        <CommentList comments={data.commentDtoList} />
                    </div>
                </div>
            </div>
        )
        // <div className='mx-auto mt-5 flex w-[50rem] flex-col p-8'>
        //     <div className='flex flex-col'>
        //         <BoardHeader
        //             title={response.response.examCollectionPostDto.title}
        //             username={response.response.examCollectionPostDto.userName}
        //             viewCount={response.response.examCollectionPostDto.viewCount}
        //             likeCount={response.response.examCollectionPostDto.likeCount}
        //             createdTime={response.response.examCollectionPostDto.createdTime}
        //             modifiedTime={response.response.examCollectionPostDto.modifiedTime}
        //             onModifyTextClick={handleModifyTextClick}
        //             onDeleteTextClick={handleDeleteTextClick}
        //             memberWritten={response.response.examCollectionPostDto.memberWritten}
        //         />
        //         <hr />
        //         <BoardBody bodyContent={response.response.examCollectionPostDto.bodyContent} />
        //         <FileList files={response.response.fileDtoList} />
        //         <div className={'mb-9 flex justify-center'}>
        //             <BoardLikeButton boardId={boardId} isMemberLiked={response.response.memberLiked} />
        //         </div>
        //         <hr />
        //         <div>
        //             <div className='mt-8 flex items-center'>
        //                 <h4 className='mx-2 text-lg font-bold'>댓글</h4>
        //                 <FaRegComments className='mx-1 h-6 w-6' />
        //             </div>
        //             <CommentPostForm boardId={boardId} />
        //             <CommentList comments={response.response.commentResponseList} />
        //         </div>
        //     </div>
        // </div>
    );
}
