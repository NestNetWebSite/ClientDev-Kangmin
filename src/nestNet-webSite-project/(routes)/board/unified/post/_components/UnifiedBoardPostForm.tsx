import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import PostInputs from '../../../../../_components/PostInputs';
import CategoryInput from '../../_components/CategoryInput';
import FileUpload from '../../../../../_components/FileUpload';

interface Inputs {
    title: string;
    bodyContent: string;
    unifiedPostType: string;
}

interface FileInfo {
    id: string;
    file: File;
}

export default function UnifiedBoardPostForm() {
    const [fileInformation, setFileInformation] = useState<FileInfo[]>([]);
    const navigate = useNavigate();
    const formMethods = useForm<Inputs>({ mode: 'onBlur', defaultValues: { bodyContent: '' } });

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

    const onSubmit: SubmitHandler<Inputs> = data => {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('data', blob);

        fileInformation.forEach(fileInfo => formData.append('file', fileInfo.file));

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}:8080/unified-post/post`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('access_token') },
            })
            .then(() => window.alert('게시글을 작성하였습니다.'))
            .catch(error => window.alert(error))
            .finally(() => navigate('/board/unified'));
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mx-auto flex w-[84rem] gap-x-8 p-5'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'mt-8 flex w-4/6 flex-col'}>
                    <PostInputs />
                </div>
                <div
                    className={'mt-8 flex h-fit w-2/6 flex-col rounded-3xl border border-gray-200 px-6 py-5 shadow-md'}
                >
                    <CategoryInput />
                    <FileUpload
                        fileInformation={fileInformation}
                        onFileInputChange={handleFileInputChange}
                        onFileDeleteButtonClick={handleFileDeleteButtonClick}
                    />
                    <button
                        className={'w-full rounded-2xl bg-black p-3 text-white transition-all hover:bg-black/[.85]'}
                        type={'submit'}
                    >
                        <span className={'font-semibold '}>게시하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
