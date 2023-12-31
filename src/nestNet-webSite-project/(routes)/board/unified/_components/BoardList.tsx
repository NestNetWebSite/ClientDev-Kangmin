import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from './Board';
import type { Post } from '../types';

export default function BoardList({ boardList }: { boardList: Post[] }) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: string) => {
        navigate(`/board/unified/${id}`);
    }, []);

    return (
        <main className={'grid w-full grid-cols-3 gap-x-6 gap-y-7 p-4'}>
            {boardList.map(board => {
                return (
                    <Board
                        key={board.id}
                        id={board.id}
                        userName={board.username}
                        title={board.title}
                        createdTime={board.createdTime}
                        viewCount={board.viewCount}
                        likeCount={board.likeCount}
                        onBoardClick={handleBoardClick}
                    />
                );
            })}
        </main>
    );
}
