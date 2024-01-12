import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostInputs from '../../../../../_components/PostInputs';
import CategoryInput from '../../_components/CategoryInput';
import FileUpload from '../../../../../_components/FileUpload';

interface ExistingBoardInfo {
    title: string;
    unifiedPostType: string;
    bodyContent: string;
    existingFileData: { id: number; originalFileName: string; saveFileName: string }[];
}

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

const response = {
    response: {
        'is-member-liked': false,
        'file-data': [
            {
                id: 44,
                originalFileName: '개발 게시판 테스트 이미지.png',
                saveFileName: 'c4a59409-cc6d-4e9e-84fe-3c2c9affff8f_개발 게시판 테스트 이미지.png',
            },
        ],
        'comment-data': [],
        'post-data': {
            id: 63,
            title: '도커 이미지가 뭔가요',
            bodyContent: 'testtesttesttest',
            viewCount: 1,
            likeCount: 0,
            unifiedPostType: 'DEV',
            userName: '테스트2',
            createdTime: [2023, 8, 7, 22, 59, 2, 606474000],
            modifiedTime: null,
            memberWritten: true,
        },
    },
    error: null,
};

const unifiedPostTypeOptions: { value: string; label: string }[] = [
    { value: 'FREE', label: '자유' },
    { value: 'DEV', label: '개발' },
    { value: 'CAREER', label: '진로' },
];

export default function UnifiedBoardModifyForm() {
    const navigate = useNavigate();
    const boardId = useParams().boardId;

    // @ts-ignore
    const { title, unifiedPostType, bodyContent, existingFileData }: ExistingBoardInfo = useLoaderData();

    const [fileInformation, setFileInformation] = useState<FileData[]>(
        existingFileData.map(file => ({
            file: { name: file.originalFileName },
            id: file.id,
            isOriginal: true,
        })),
    );

    const [existingFileIdList, setExistingFileIdList] = useState(existingFileData.map(file => file.id));

    const formMethods = useForm<Inputs>({ mode: 'onBlur', defaultValues: { title, bodyContent, unifiedPostType } });

    const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        const newFileInformation: FileData[] = Array.from(event.target.files).map(file => ({ id: nanoid(), file }));
        setFileInformation(prevState => [...prevState, ...newFileInformation]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileInfo: FileData) => {
        if ('isOriginal' in targetFileInfo.file) {
            setExistingFileIdList(prevState => prevState.filter(id => id !== targetFileInfo.id));
        }
        setFileInformation(prevState => prevState.filter(fileData => fileData.id !== targetFileInfo.id));
    }, []);

    const onSubmit: SubmitHandler<Inputs> = data => {
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
