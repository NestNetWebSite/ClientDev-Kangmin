import { useNavigate } from 'react-router-dom';
import { PiPlus } from 'react-icons/pi';

export default function ExamBoardAddButton() {
    const navigate = useNavigate();
    return (
        <button
            className='fixed bottom-20 right-20 box-content rounded-full bg-rose-800 p-3 text-white shadow-md duration-300 hover:scale-110'
            onClick={(): void => {
                navigate('/board/exam/post');
            }}
        >
            <PiPlus className='h-10 w-10' />
        </button>
    );
}
