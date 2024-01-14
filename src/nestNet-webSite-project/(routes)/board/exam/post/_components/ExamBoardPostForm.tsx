import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ExamInfoInputs from '../../_components/ExamInfoInputs';
import FileUpload from '../../../../../_components/FileUpload';
import PostInputs from '../../../../../_components/PostInputs';

interface Inputs {
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
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
    const formMethods = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: { bodyContent: '', year: new Date().getFullYear() },
    });

    const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        const newFileInformation: FileInfo[] = Array.from(event.target.files).map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFileInformation]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileInfo: FileInfo) => {
        setFileInformation(prevState => prevState.filter(fileInfo => fileInfo.id !== targetFileInfo.id));
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        data.semester = Number(data.semester);
        try {
            const formData = new FormData();
            const blob = new Blob([JSON.stringify({ ...data, postCategory: 'EXAM' })], { type: 'application/json' });

            formData.append('data', blob);
            fileInformation.forEach(fileInfo => formData.append('file', fileInfo.file));

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}:8080/exam-collection-post/post`, formData, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem('access_token'),
                    'Content-Type': 'multipart/form-data',
                },
            });

            window.alert('게시글 저장에 성공하였습니다.');
            navigate('/board/exam');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mx-auto flex w-[84rem] gap-x-8 p-5'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'mt-8 flex w-4/6 flex-col'}>
                    <PostInputs />
                </div>
                <div className={'mt-8 flex w-2/6 flex-col rounded-3xl border border-gray-200 px-6 py-5 shadow-md'}>
                    <ExamInfoInputs />
                    <FileUpload
                        fileInformation={fileInformation}
                        onFileInputChange={handleFileInputChange}
                        onFileDeleteButtonClick={handleFileDeleteButtonClick}
                    />
                    <button
                        className={
                            'w-full rounded-2xl bg-slate-950 p-3 text-white transition-all hover:bg-slate-950/[.85]'
                        }
                        type={'submit'}
                    >
                        <span className={'font-semibold '}>게시하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
