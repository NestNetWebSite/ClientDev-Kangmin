import { useNavigate } from 'react-router-dom';
import { PiPlus } from 'react-icons/pi';

export default function ExamBoardAddButton() {
    const navigate = useNavigate();
    return (
        <button
            className='fixed bottom-20 right-20 box-content rounded-full bg-slate-950 p-3 text-white shadow-md transition-all hover:bg-slate-950/[.85]'
            onClick={() => {
                navigate('/board/exam/post');
            }}
            type={'button'}
        >
            <PiPlus className='h-10 w-10' />
        </button>
    );
}
