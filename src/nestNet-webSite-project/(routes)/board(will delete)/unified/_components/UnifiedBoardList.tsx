import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedBoard from './UnifiedBoard';
import type { Post } from '../types';

export default function UnifiedBoardList({ boardList }: { boardList: Post[] }) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: string | number) => {
        navigate(`/board/unified/${id}`);
    }, []);

    return (
        <main className={'flex flex-col'}>
            {boardList.map(board => {
                return (
                    <UnifiedBoard
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
