import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PedigreeBoard from './PedigreeBoard';

interface Props {
    pedigreeBoardList: {
        id: number;
        subject: string;
        professor: string;
        year: number;
        semester: string | number;
        examType: string;
        userName: string;
    }[];
}

export default function PedigreeBoardList({ pedigreeBoardList }: Props) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: number) => {
        navigate(`/pedigree/${id}`);
    }, []);

    return (
        <main className='flex flex-col'>
            {pedigreeBoardList?.map(pedigreeBoard => {
                return <PedigreeBoard {...pedigreeBoard} onBoardClick={handleBoardClick} />;
            })}
        </main>
    );
}
