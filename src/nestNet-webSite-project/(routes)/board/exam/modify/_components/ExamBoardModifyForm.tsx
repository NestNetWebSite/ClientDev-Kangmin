import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FileUpload from '../../../../../_components/FileUpload';
import PostInputs from '../../../../../_components/PostInputs';
import ExamInfoInputs from '../../_components/ExamInfoInputs';

interface ExistingBoardInfo {
    title: string;
    bodyContent: string;
    subject: string;
    professor: string;
    year: number;
    semester: number;
    examType: string;
    existingFileData: { id: number; originalFileName: string; saveFileName: string }[];
}

interface Inputs {
    title: string;
    bodyContent: string;
    subject: string;
    professor: string;
    year: number;
    semester: number | string;
    examType: string;
}

interface FileData {
    id: string | number;
    file: File | { name: string };
    isOriginal?: boolean;
}

export default function ExamBoardModifyForm() {
    const navigate = useNavigate();
    const boardId = useParams().boardId;

    // @ts-ignore
    const { title, bodyContent, subject, professor, year, semester, examType, existingFileData }: ExistingBoardInfo =
        useLoaderData();
    console.log(useLoaderData());

    const [fileInformation, setFileInformation] = useState<FileData[]>(
        existingFileData.map(file => ({
            file: { name: file.originalFileName },
            id: file.id,
            isOriginal: true,
        })),
    );
    const [existingFileIdList, setExistingFileIdList] = useState<number[]>(existingFileData.map(file => file.id));

    const formMethods = useForm<Inputs>({
        mode: 'onBlur',
        defaultValues: { title, bodyContent, subject, professor, year, semester: semester.toString(), examType },
    });

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
        const formData = new FormData();
        const blob = new Blob(
            [JSON.stringify({ ...data, semester: Number(data.semester), postCategory: 'EXAM', id: boardId })],
            { type: 'application/json' },
        );
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
        console.log({ ...data, semester: Number(data.semester), postCategory: 'EXAM', id: boardId });
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
