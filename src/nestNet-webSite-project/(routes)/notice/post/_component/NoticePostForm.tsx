import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import axios from 'axios';
import PostInputs from '../../../../_components/PostInputs';
import FileUploadDropzone from '../../../../_components/FileUploadDropzone';
import FileList from '../../../../_components/FileList';

interface Inputs {
    title: string;
    bodyContent: string;
}

interface FileData {
    id: string;
    file: File;
}

export default function NoticePostForm() {
    const [fileInformation, setFileInformation] = useState<FileData[]>([]);
    const navigate = useNavigate();
    const formMethods = useForm<Inputs>({
        mode: 'onBlur',
    });

    const addFiles = useCallback((files: File[]) => {
        const newFiles: FileData[] = files.map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFiles]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileData: FileData) => {
        setFileInformation(prevState => prevState.filter(fileData => fileData.id !== targetFileData.id));
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        try {
            const formData = new FormData();
            const blob = new Blob([JSON.stringify({ ...data })], { type: 'application/json' });

            formData.append('data', blob);
            fileInformation.forEach(fileData => formData.append('file', fileData.file));

            await axios.post(`/notice-post/post`, formData, {
                withCredentials: true,
            });

            window.alert('게시글 저장에 성공하였습니다.');
            navigate('/notice');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mx-auto flex w-[50rem] flex-col py-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div>
                    <h1 className={'text-3xl font-semibold'}>공지사항 작성</h1>
                </div>
                <div className={'mt-8 w-full'}>
                    <PostInputs />
                </div>
                <div>
                    <FileUploadDropzone addFiles={addFiles} />
                    <FileList fileInformation={fileInformation} onFileDeleteButtonClick={handleFileDeleteButtonClick} />
                </div>
                <div className={'flex justify-end gap-x-4'}>
                    <button
                        className={
                            'rounded-xl border border-rose-800 p-3 text-rose-800 transition-all hover:bg-rose-50'
                        }
                        type={'button'}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <span className={'font-semibold '}>취소하기</span>
                    </button>
                    <button
                        className={'rounded-xl bg-rose-800 p-3 text-white transition-all hover:bg-rose-900'}
                        type={'submit'}
                    >
                        <span className={'font-semibold '}>게시하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
