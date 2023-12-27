import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { modules, formats } from '../../board-common-components/quill-toolbar/QuillToolbar';
import QuillToolbar from '../../board-common-components/quill-toolbar/QuillToolbar';
import 'react-quill/dist/quill.snow.css';
import FileUpload from './FileUpload';

interface Inputs {
    title: string;
    bodyContent: string;
    unifiedPostType: string;
}

interface FileInfo {
    id: string;
    file: File;
}

const unifiedPostTypeOptions: { value: string; label: string }[] = [
    { value: 'FREE', label: '자유' },
    { value: 'DEV', label: '개발' },
    { value: 'CAREER', label: '진로' },
];

export default function UnifiedBoardPostForm() {
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
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('data', blob);

        fileInformation.forEach((fileInfo) => formData.append('file', fileInfo.file));

        axios
            .post(`${process.env.BACKEND_URL}/unified-post/post`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(() => window.alert('게시글을 작성하였습니다.'))
            .catch((error) => window.alert(error))
            .finally(() => navigate('/board/unified'));
    };

    return (
        <main className={'w-full'}>
            <form className={'mx-auto mt-4 flex w-[45rem] flex-col p-4'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'mb-5 flex flex-col'}>
                    <span className={'mx-2 mb-2 font-semibold text-gray-600'}>카테고리</span>
                    <Controller
                        control={control}
                        name={'unifiedPostType'}
                        defaultValue={'FREE'}
                        render={({ field }) => {
                            return (
                                <Select
                                    isSearchable={false}
                                    placeholder={'카테고리 선택'}
                                    options={unifiedPostTypeOptions}
                                    onChange={(option) => field.onChange(option.value)}
                                    ref={field.ref}
                                    menuPlacement={'auto'}
                                    defaultValue={unifiedPostTypeOptions.find((option) => option.value === field.value)}
                                    value={unifiedPostTypeOptions.find((option) => option.value === field.value)}
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
                            <span className={'m-1 text-sm font-semibold text-red-500'}>
                                {errors.bodyContent.message}
                            </span>
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
                            defaultValue={''}
                            render={({ field }) => {
                                return (
                                    <>
                                        <QuillToolbar />
                                        <ReactQuill
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
        </main>
    );
}
