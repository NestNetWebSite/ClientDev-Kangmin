import axios from 'axios';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostInputs from '../../../../../_components/PostInputs';
import CategoryInput from '../../_components/CategoryInput';
import FileUploadDropzone from '../../../../../_components/FileUploadDropzone';
import FileList from '../../../../../_components/FileList';

interface Inputs {
    title: string;
    bodyContent: string;
    unifiedPostType: string;
}

interface FileData {
    id: string | number;
    file: File | { name: string };
    isOriginal?: boolean;
}

export default function UnifiedBoardModifyForm() {
    const navigate = useNavigate();
    const boardId = useParams().boardId;

    // @ts-ignore
    const { title, unifiedPostType, bodyContent } = useLoaderData().unifiedPostDto;

    // @ts-ignore
    const existingFileData = useLoaderData().fileDtoList;

    const [fileInformation, setFileInformation] = useState<FileData[]>(
        existingFileData.map(file => ({
            file: { name: file.originalFileName },
            id: file.id,
            isOriginal: true,
        })),
    );

    const [existingFileIdList, setExistingFileIdList] = useState<number[]>(existingFileData.map(file => file.id));

    const formMethods = useForm<Inputs>({ mode: 'onBlur', defaultValues: { title, bodyContent, unifiedPostType } });

    const addFiles = useCallback((files: File[]) => {
        const newFiles: FileData[] = files.map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFiles]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileInfo: FileData) => {
        if ('isOriginal' in targetFileInfo) {
            setExistingFileIdList(prevState => prevState.filter(id => id !== targetFileInfo.id));
        }
        setFileInformation(prevState => prevState.filter(fileData => fileData.id !== targetFileInfo.id));
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        console.log(data);
        const formData = new FormData();
        const blob = new Blob([JSON.stringify({ ...data, id: boardId })], { type: 'application/json' });
        formData.append('data', blob);

        const addedFileInformation = fileInformation.filter(fileData => !('isOriginal' in fileData));
        if (addedFileInformation.length === 0) {
            formData.append('file', JSON.stringify([]));
        } else {
            addedFileInformation.forEach(fileData => {
                if (fileData.file instanceof File) {
                    formData.append('file', fileData.file);
                }
            });
        }

        const fileIdListBlob = new Blob([JSON.stringify(existingFileIdList)], { type: 'application/json' });
        formData.append('file-id', fileIdListBlob);
        try {
            await axios.post(`/unified-post/modify`, formData, {
                withCredentials: true,
                headers: { Authorization: localStorage.getItem('access_token'), 'Content-Type': 'multipart/form-data' },
            });
            window.alert('수정되었습니다.');
            navigate(`/board/unified/${boardId}`, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormProvider {...formMethods}>
            <form className={'mx-auto flex w-[50rem] flex-col py-8'} onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={'flex items-center justify-between'}>
                    <h1 className={'text-3xl font-semibold'}>통합 게시판 글 수정</h1>
                    <CategoryInput />
                </div>
                <div className={'my-8 w-full'}>
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
                        <span className={'font-semibold '}>수정하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
