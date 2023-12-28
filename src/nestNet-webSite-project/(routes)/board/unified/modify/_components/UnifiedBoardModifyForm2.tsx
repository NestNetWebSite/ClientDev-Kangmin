import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import QuillToolbar, { formats, modules } from '../../../board-common-components/quill-toolbar/QuillToolbar';
import ReactQuill from 'react-quill';
import FileUpload from './FileUpload';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

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
    const [searchParams] = useSearchParams();
    const boardId = searchParams.get('boardId');

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

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: 'onBlur', defaultValues: { title, bodyContent, unifiedPostType } });

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
        <form className={'mx-auto mt-4 flex w-[45rem] flex-col p-4'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'mb-5 flex flex-col'}>
                <span className={'mx-2 mb-2 font-semibold text-gray-600'}>카테고리</span>
                <Controller
                    control={control}
                    name={'unifiedPostType'}
                    render={({ field }) => {
                        return (
                            <Select
                                isSearchable={false}
                                placeholder={'카테고리 선택'}
                                options={unifiedPostTypeOptions}
                                onChange={option => field.onChange(option.value)}
                                ref={field.ref}
                                menuPlacement={'auto'}
                                defaultValue={unifiedPostTypeOptions.find(option => option.value === field.value)}
                                value={unifiedPostTypeOptions.find(option => option.value === field.value)}
                                classNames={{
                                    control() {
                                        return '!rounded-lg !h-[52px] !border !border-gray-100 !bg-gray-100 !border-2 !text-sm !shadow-none';
                                    },

                                    option() {
                                        return '!text-sm';
                                    },
                                }}
                            />
                        );
                    }}
                />
            </div>
            <div className={'my-5 flex flex-col'}>
                <div className={'flex gap-x-1'}>
                    <label className={'mx-2 mb-2 w-fit font-semibold text-gray-600'} htmlFor={'titleInput'}>
                        게시글 제목
                    </label>
                    {errors?.title?.message && errors?.title?.type === 'required' && (
                        <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.title.message}</span>
                    )}
                </div>
                <input
                    className={'rounded-lg border-2 border-gray-100 bg-gray-100 px-4 py-3 focus:outline-none'}
                    id={'titleInput'}
                    type={'text'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('title', { required: { value: true, message: '게시글 제목을 입력해주세요.' } })}
                />
            </div>
            <div className={'my-5 flex flex-col'}>
                <div className={'flex gap-x-1'}>
                    <span className={'mx-2 mb-2 font-semibold text-gray-600'}>게시글 내용</span>
                    {errors?.bodyContent?.message && errors?.bodyContent?.type === 'required' && (
                        <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.bodyContent.message}</span>
                    )}
                </div>
                <div className={'rounded-xl border-2 border-gray-100'}>
                    <Controller
                        control={control}
                        name={'bodyContent'}
                        rules={{
                            validate: {
                                required(value) {
                                    return value.length !== 0 || '게시글 내용을 입력해주세요.';
                                },
                            },
                        }}
                        render={({ field }) => {
                            return (
                                <>
                                    <QuillToolbar />
                                    <ReactQuill
                                        defaultValue={field.value}
                                        theme={'snow'}
                                        modules={modules}
                                        formats={formats}
                                        className={'h-[20rem] rounded-b-xl border border-gray-100 bg-gray-100'}
                                        onChange={(content: string) => {
                                            if (content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                                                field.onChange('');
                                            } else {
                                                field.onChange(content);
                                            }
                                        }}
                                        onBlur={field.onBlur}
                                    />
                                </>
                            );
                        }}
                    />
                </div>
            </div>
            <FileUpload
                fileInformation={fileInformation}
                onFileInputChange={handleFileInputChange}
                onFileDeleteButtonClick={handleFileDeleteButtonClick}
            />
            <div className={'flex w-full justify-end'}>
                <button
                    className={
                        'mt-3 box-content flex items-center gap-x-2 rounded-2xl bg-rose-800 px-6 py-3 text-white'
                    }
                    type={'submit'}
                >
                    <HiOutlinePencilSquare className={'h-6 w-6'} />
                    <span className={'font-semibold '}>게시글 작성</span>
                </button>
            </div>
        </form>
    );
}
