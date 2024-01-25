import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types';
import ExamBoard from './ExamBoard';

export default function ExamBoardList({ boardList }: { boardList: Post[] }) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: number) => {
        navigate(`/board/exam/${id}`);
    }, []);

    return (
        <main className='flex flex-col'>
            {boardList?.map(board => {
                return (
                    <ExamBoard
                        key={board.id}
                        id={board.id}
                        year={board.year}
                        semester={board.semester}
                        examType={board.examType}
                        subject={board.subject}
                        professor={board.professor}
                        userName={board.userName}
                        onBoardClick={handleBoardClick}
                    />
                );
            })}
        </main>
    );
}
