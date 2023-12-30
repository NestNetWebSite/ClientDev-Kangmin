import axios from 'axios';
import { nanoid } from 'nanoid';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { LiaChalkboardTeacherSolid, LiaCalendarAlt } from 'react-icons/lia';
import { MdTitle } from 'react-icons/md';
import { PiBooks, PiExam, PiListNumbers } from 'react-icons/pi';
import FileUpload from './FileUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillToolbar, { formats, modules } from '../../../_components/QuillToolbar';

interface Inputs {
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    title: string;
    bodyContent: string;
}

interface FileInfo {
    id: string;
    file: File;
}

export default function ExamBoardPostForm() {
    const [fileInformation, setFileInformation] = useState<FileInfo[]>([]);
    const navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: 'onBlur', defaultValues: { year: new Date().getFullYear() } });

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
        data.semester = Number(data.semester);
        console.log(data);
    };

    return (
        <form className={'mx-auto flex w-[84rem] p-5'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'mr-16 mt-8 flex w-2/5 flex-col'}>
                <div className={'mb-12 flex w-full flex-col'}>
                    <div className={'flex gap-x-1'}>
                        <label className={'mx-2.5 mb-2 font-semibold text-gray-600'} htmlFor={'subjectInput'}>
                            강좌명
                        </label>
                        {errors?.subject?.message && errors?.subject?.type === 'required' && (
                            <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.subject.message}</span>
                        )}
                    </div>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <PiBooks className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            id={'subjectInput'}
                            type={'text'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('subject', {
                                required: { value: true, message: '강좌명을 입력해주세요.' },
                            })}
                        />
                    </div>
                </div>
                <div className={'mb-12 flex w-full flex-col'}>
                    <div className={'flex gap-x-1'}>
                        <label className={'mx-2.5 mb-2 font-semibold text-gray-600'} htmlFor={'professorInput'}>
                            교수명
                        </label>
                        {errors?.professor?.message && errors?.professor?.type === 'required' && (
                            <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.professor.message}</span>
                        )}
                    </div>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <LiaChalkboardTeacherSolid className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            id={'professorInput'}
                            type={'text'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('professor', {
                                required: { value: true, message: '교수명을 입력해주세요.' },
                            })}
                        />
                    </div>
                </div>
                <div className={'mb-12 flex w-full flex-col'}>
                    <div className={'flex gap-x-1'}>
                        <label className='mx-2.5 mb-2 font-semibold text-gray-600' htmlFor={'yearInput'}>
                            연도
                        </label>
                        {errors?.year?.message && errors?.year?.type === 'required' && (
                            <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.year.message}</span>
                        )}
                        {errors?.year?.message && errors?.year?.type === 'outOfRange' && (
                            <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.year.message}</span>
                        )}
                    </div>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <LiaCalendarAlt className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            id={'yearInput'}
                            type={'number'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('year', {
                                required: { value: true, message: '연도를 입력해주세요.' },
                                validate: {
                                    outOfRange(year) {
                                        return (
                                            (year >= 2000 && year <= new Date().getFullYear()) ||
                                            '연도의 범위는 2000년도 ~ 현재 연도입니다.'
                                        );
                                    },
                                },
                            })}
                        />
                    </div>
                </div>
                <div className={'mb-12 flex w-full flex-col p-1'}>
                    <span className={'mx-2.5 mb-2 font-semibold text-gray-600'}>학기</span>
                    <div className={'flex items-center'}>
                        <PiListNumbers className={'h-7 w-7'} />
                        <div className={'mx-4 flex items-center'}>
                            <input
                                className={'scale-125'}
                                defaultChecked
                                id={'1stSemesterRadioButton'}
                                type={'radio'}
                                value={'1'}
                                {...register('semester')}
                            />
                            <label
                                className={'ml-2 mr-5 font-semibold text-gray-700'}
                                htmlFor={'1stSemesterRadioButton'}
                            >
                                1학기
                            </label>
                            <input
                                className={'scale-125'}
                                id={'2ndSemesterRadioButton'}
                                type={'radio'}
                                value={'2'}
                                {...register('semester')}
                            />
                            <label className={'ml-2 font-semibold text-gray-700'} htmlFor={'2ndSemesterRadioButton'}>
                                2학기
                            </label>
                        </div>
                    </div>
                </div>
                <div className={'flex w-full flex-col'}>
                    <span className={'mx-2.5 mb-2 font-semibold text-gray-600'}>시험 종류</span>
                    <div className={'flex items-center'}>
                        <PiExam className={'ml-1 h-7 w-7'} />
                        <div className={'mx-4 flex items-center'}>
                            <input
                                className={'scale-125'}
                                defaultChecked
                                id={'midtermRadioButton'}
                                type={'radio'}
                                value={'MID'}
                                {...register('examType')}
                            />
                            <label className={'ml-2 mr-5 font-semibold text-gray-700'} htmlFor={'midtermRadioButton'}>
                                중간고사
                            </label>
                            <input
                                className={'scale-125'}
                                id={'finalRadioButton'}
                                type={'radio'}
                                value={'FINAL'}
                                {...register('examType')}
                            />
                            <label className={'ml-2 mr-5 font-semibold text-gray-700'} htmlFor={'finalRadioButton'}>
                                기말고사
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'mt-8 flex w-3/5 flex-col'}>
                <div className={'mb-12 flex w-full flex-col'}>
                    <div>
                        <label className={'mx-2.5 mb-2 font-semibold text-gray-600'} htmlFor={'titleInput'}>
                            게시글 제목
                        </label>
                        {errors?.title?.message && errors?.title?.type === 'required' && (
                            <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.title.message}</span>
                        )}
                    </div>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <MdTitle className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            id={'titleInput'}
                            type={'text'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('title', {
                                required: { value: true, message: '게시글 제목을 입력해주세요.' },
                            })}
                        />
                    </div>
                </div>
                <div className={'mb-8 flex w-full flex-col'}>
                    <div className={'flex gap-x-1'}>
                        <span className={'mx-2.5 mb-2 font-semibold text-gray-600'}>게시글 내용</span>
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
                <div className={'flex w-full items-center'}>
                    <FileUpload
                        fileInformation={fileInformation}
                        onFileInputChange={handleFileInputChange}
                        onFileDeleteButtonClick={handleFileDeleteButtonClick}
                    />
                    <div className='ml-3 mt-10 flex w-1/5 items-center justify-center'>
                        <button
                            className={
                                'box-content flex w-32 items-center justify-center gap-x-2 rounded-2xl bg-rose-800 p-3 text-white'
                            }
                            type={'submit'}
                        >
                            <HiOutlinePencilSquare className={'h-6 w-6'} />
                            <span className={'font-semibold '}>게시글 작성</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
