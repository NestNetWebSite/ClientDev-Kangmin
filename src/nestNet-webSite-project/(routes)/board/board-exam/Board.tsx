import { PiChalkboardTeacher } from 'react-icons/pi';

interface Props {
    id: number;
    year: number;
    semester: number;
    examType: string;
    subject: string;
    professor: string;
    userName: string;

    onBoardClick(id: number): void;
}

export default function Board({ id, year, semester, examType, subject, professor, userName, onBoardClick }: Props) {
    return (
        <article
            className='flex cursor-pointer flex-col rounded-xl border border-gray-100 px-5 py-7 shadow-md duration-300 hover:-translate-y-1 hover:shadow-xl'
            onClick={(): void => {
                onBoardClick(id);
            }}
        >
            <div className='mb-6 mt-1 flex items-center justify-between'>
                <span className='block text-base font-extrabold text-gray-500'>
                    {year}년도 {semester}학기
                </span>
                <span
                    className={`box-content block rounded-2xl px-3 py-1 font-extrabold ${
                        examType === 'FINAL' ? 'bg-orange-300' : 'bg-blue-300'
                    } text-white`}
                >
                    {examType === 'FINAL' ? '기말' : '중간'}고사
                </span>
            </div>
            <div className='mb-12'>
                <h1 className='line-clamp-1 text-2xl font-bold text-gray-800'>{subject}</h1>
            </div>
            <div className='flex items-end justify-between'>
                <span className='block text-base'>
                    <span className='font-bold'>{`${professor} `}</span>
                    교수님
                </span>
                <span className='mr-2 block text-stone-600'>{userName}</span>
            </div>
        </article>
    );
}
