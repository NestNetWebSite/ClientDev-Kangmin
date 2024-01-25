import axios from 'axios';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import PostInputs from '../../../../../_components/PostInputs';
import CategoryInput from '../../_components/CategoryInput';
import FileUploadDropzone from '../../../../../_components/FileUploadDropzone';
import FileList from '../../../../../_components/FileList';

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
    const formMethods = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: { bodyContent: '', unifiedPostType: 'FREE' },
    });

    const addFiles = useCallback((files: File[]) => {
        const newFiles: FileInfo[] = files.map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFiles]);
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
            .post(`/unified-post/post`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data', Authorization: localStorage.getItem('access_token') },
            })
            .then(() => window.alert('게시글을 작성하였습니다.'))
            .catch(error => window.alert(error))
            .finally(() => navigate('/board/unified'));
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mx-auto flex w-[50rem] flex-col py-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex items-center justify-between'}>
                    <h1 className={'text-3xl font-semibold'}>통합 게시판 글 작성</h1>
                    <CategoryInput />
                </div>
                <div className={'my-8 w-full'}>
                    <PostInputs />
                </div>
                <div>
                    {/*<CategoryInput />*/}
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
