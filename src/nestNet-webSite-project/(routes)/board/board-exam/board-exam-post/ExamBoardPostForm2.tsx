import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { LiaChalkboardTeacherSolid, LiaCalendarAlt } from 'react-icons/lia';
import { MdTitle } from 'react-icons/md';
import { PiBooks, PiExam, PiListNumbers } from 'react-icons/pi';
import FileUpload from './FileUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Inputs {
    subject: string;
    professor: string;
    year: number;
    semester: string;
    examType: string;
    title: string;
    bodyContent: string;
}

interface FileInfo {
    id: string;
    file: File;
}

export default function ExamBoardPostForm() {
    const [fileInformation, setFileInformation] = useState<FileInfo[]>([]);
    const navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: 'onBlur' });

    const handleFileInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newFileInformation: FileInfo[] = Array.from(event.target.files).map((file) => ({
            id: nanoid(),
            file,
        }));
        setFileInformation((prevState) => [...prevState, ...newFileInformation]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileInfo: FileInfo) => {
        setFileInformation((prevState) => prevState.filter((fileInfo) => fileInfo.id !== targetFileInfo.id));
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <main className={'w-full'}>
            <form className={'mx-auto flex w-[84rem] p-5'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'mr-16 mt-8 flex w-2/5 flex-col'}>
                    <div className={'mb-12 flex w-full flex-col'}>
                        <div className={'flex gap-x-1'}>
                            <label className={'mx-2.5 mb-2 font-semibold text-gray-600'} htmlFor={'subjectInput'}>
                                강좌명
                            </label>
                        </div>
                        <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 p-1'}>
                            <PiBooks className={'ml-1 h-7 w-7'} />
                            <input
                                className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                                id={'subjectInput'}
                                type={'text'}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                {...register('subject', {
                                    required: { value: true, message: '강좌명을 입력해주세요.' },
                                })}
                            />
                        </div>
                    </div>
                    <div className={'mb-12 flex w-full flex-col'}>
                        <label className={'mx-2.5 mb-2 font-semibold text-gray-600'} htmlFor={'professorInput'}>
                            교수명
                        </label>
                        <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                            <LiaChalkboardTeacherSolid className={'ml-1 h-7 w-7'} />
                            <input />
                        </div>
                    </div>
                    <div>
                        <label>연도</label>
                        <div>
                            <LiaCalendarAlt className={'ml-1 h-7 w-7'} />
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
}
