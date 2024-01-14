import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PostInputs from '../../../../../_components/PostInputs';
import ImageManagement from '../../_components/ImageManagement';

interface Inputs {
    title: string;
    bodyContent: string;
    image: FileList;
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

    const onSubmit: SubmitHandler<Inputs> = async data => {
        console.log(data.image['0']);
        console.log('?');
        try {
            console.log('??');
            const formData = new FormData();
            const blob = new Blob(
                [
                    JSON.stringify({
                        title: data.title,
                        bodyContent: data.bodyContent,
                    }),
                ],
                { type: 'application/json' },
            );
            formData.append('data', blob);
            formData.append('file', data.image['0']);
            console.log('??');

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}:8080/introduction-post/post`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('access_token'),
                    },
                },
            );

            console.log(response);
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
                <div
                    className={'mt-8 flex h-fit w-2/6 flex-col rounded-3xl border border-gray-200 px-6 py-5 shadow-md'}
                >
                    <ImageManagement />
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
