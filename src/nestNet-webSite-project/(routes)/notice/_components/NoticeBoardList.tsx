import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NoticeBoard from './NoticeBoard';

interface Board {
    id: number;
    title: string;
    createdTime: string;
    viewCount: number;
    likeCount: number;
    userName: string;
}

interface Props {
    boardList: Board[];
}

export default function NoticeBoardList({ boardList }: Props) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: number) => {
        navigate(`/notice/${id}`);
    }, []);

    return (
        <main className={'flex flex-col'}>
            {boardList.map(board => {
                return <NoticeBoard key={board.id} {...board} onBoardClick={handleBoardClick} />;
            })}
        </main>
    );
}
