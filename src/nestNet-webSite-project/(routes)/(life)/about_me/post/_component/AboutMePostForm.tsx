import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostInputs from '../../../../../_components/PostInputs';
import ProfileImageManagement from '../../_components/ProfileImageManagement';
import FileUpload from '../../../../../_components/FileUpload';

interface Inputs {
    title: string;
    bodyContent: string;
    profileImage: FileList;
}

interface FileData {
    id: string;
    file: File;
}

export default function AboutMePostForm() {
    const [fileInformation, setFileInformation] = useState<FileData[]>([]);

    const navigate = useNavigate();
    const formMethods = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: { bodyContent: '' },
    });

    const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
        const newFileInformation: FileData[] = Array.from(event.target.files).map(file => ({
            id: nanoid(),
            file,
        }));
        setFileInformation(prevState => [...prevState, ...newFileInformation]);
    }, []);

    const handleFileDeleteButtonClick = useCallback((targetFileInfo: FileData) => {
        setFileInformation(prevState => prevState.filter(fileInfo => fileInfo.id !== targetFileInfo.id));
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async data => {
        await new Promise(resolve => setTimeout(() => resolve(1000), 10 * 1000));
        console.log(data);
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
                    <ProfileImageManagement />
                    <FileUpload
                        fileInformation={fileInformation}
                        onFileInputChange={handleFileInputChange}
                        onFileDeleteButtonClick={handleFileDeleteButtonClick}
                    />
                    <button
                        className={
                            'w-full rounded-2xl bg-slate-950 p-3 text-white transition-all enabled:cursor-pointer enabled:hover:bg-slate-950/[.85] disabled:cursor-default disabled:opacity-50'
                        }
                        type={'submit'}
                        disabled={formMethods.formState.isSubmitting}
                    >
                        <span className={'font-semibold '}>게시하기</span>
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
