import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import QuillToolbar, { modules, formats } from '../../_components/QuillToolbar';
import { nanoid } from 'nanoid';
import { LiaChalkboardTeacherSolid, LiaCalendarAlt } from 'react-icons/lia';
import { MdTitle } from 'react-icons/md';
import { PiBooks, PiExam, PiListNumbers } from 'react-icons/pi';
import FileUpload from './_components/FileUpload';
import 'react-quill/dist/quill.snow.css';

// 마운트 될 때 handleSubmit(onSubmit) 함수 호출 -> 함수 반환
// 폼 제출할 때, 위에서 반환한 함수 호출
// 유효성 검사 실패하면, onSubmit 함수 호출 안 함.
// 유효성 검사 성공하면, onSubmit 함수 호출 함. <- 내 생각

interface Board {
    title: string;
    bodyContent: string;
    subject: string;
    professor: string;
    year: number;
    semester: number;
    examType: string;
}

interface FileInfo {
    id: string;
    file: File;
}

export default function Legacy_ExamBoardPostForm() {
    console.log('render');
    const [values, setValues] = useState<Board>({
        title: '',
        bodyContent: '',
        subject: '',
        professor: '',
        year: new Date().getFullYear(),
        semester: 0,
        examType: '',
    });
    const [fileInformation, setFileInformation] = useState<FileInfo[]>([]);

    const navigate = useNavigate();

    const checkButtonDisabled = useCallback((): boolean => {
        let { title, bodyContent, subject, professor, year, semester, examType } = values;

        title = title.trim();
        bodyContent = bodyContent.trim();
        subject = subject.trim();
        professor = professor.trim();

        return (
            title.length === 0 ||
            bodyContent.length === 0 ||
            subject.length === 0 ||
            professor.length === 0 ||
            !Number.isFinite(year) ||
            year < 0 ||
            year > new Date().getFullYear() ||
            semester === 0 ||
            examType === ''
        );
    }, [values]);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            switch (event.target.id) {
                case '1stSemesterRadioButton': {
                    setValues({ ...values, semester: 1 });
                    break;
                }
                case '2ndSemesterRadioButton': {
                    setValues({ ...values, semester: 2 });
                    break;
                }
                case 'midtermRadioButton': {
                    setValues({ ...values, examType: 'MID' });
                    break;
                }
                case 'finalRadioButton': {
                    setValues({ ...values, examType: 'FINAL' });
                    break;
                }
                default: {
                    const key = event.target.id.replace('Input', '');
                    const value = key === 'year' ? Number(event.target.value) : event.target.value;
                    setValues({ ...values, [key]: value });
                }
            }
        },
        [values],
    );

    const handleContentChange = useCallback(
        (content: string) => {
            if (content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
                setValues({ ...values, bodyContent: '' });
            } else {
                setValues({ ...values, bodyContent: content });
            }
        },
        [values],
    );

    const handleFileInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const newFileInformation: FileInfo[] = Array.from(event.target.files).map(file => ({
                id: nanoid(),
                file,
            }));
            setFileInformation([...fileInformation, ...newFileInformation]);
        },
        [fileInformation],
    );

    const handleFileDelete = useCallback(
        (targetFileInfo: FileInfo) => {
            setFileInformation(fileInformation.filter(fileInfo => fileInfo.id !== targetFileInfo.id));
        },
        [fileInformation],
    );

    const handleFormSubmit = useCallback(
        (event: ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData();
            const blob = new Blob([JSON.stringify({ ...values, postCategory: 'EXAM' })], { type: 'application/json' });

            formData.append('data', blob);
            fileInformation.forEach(fileInfo => {
                formData.append('file', fileInfo.file);
            });

            axios
                .post(`${process.env.BACKEND_URL}/exam-collection-post/post`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then(() => window.alert('성공적으로 작성하였습니다.'))
                .catch(reason => window.alert(reason))
                .finally(() => navigate('/board/exam'));
        },
        [values],
    );

    const foo = () => {
        console.log('in foo');
        return () => {
            console.log('in foo2');
        };
    };

    return (
        <main className='mt-14 w-full'>
            <form className='mx-auto flex w-[84rem] p-5' onSubmit={foo()}>
                <div className='mr-16 mt-8 flex w-2/5 flex-col'>
                    <div className='mb-12 flex w-full flex-col'>
                        <label className='mx-2.5 mb-2 font-semibold text-gray-600' htmlFor={'subjectInput'}>
                            과목
                        </label>
                        <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1 focus-within:border-orange-200'>
                            <PiBooks className='ml-1 h-7 w-7' />
                            <input
                                className='flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'
                                id={'subjectInput'}
                                type={'text'}
                                value={values.subject}
                                onChange={handleInputChange}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                            />
                        </div>
                    </div>
                    <div className='mb-12 flex w-full flex-col'>
                        <label className='mx-2.5 mb-2 font-semibold text-gray-600' htmlFor={'professorInput'}>
                            교수명
                        </label>
                        <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1 focus-within:border-orange-200'>
                            <LiaChalkboardTeacherSolid className='ml-1 h-7 w-7' />
                            <input
                                className='flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'
                                id={'professorInput'}
                                type={'text'}
                                value={values.professor}
                                onChange={handleInputChange}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                            />
                        </div>
                    </div>
                    <div className='mb-12 flex w-full flex-col'>
                        <label className='mx-2.5 mb-2 font-semibold text-gray-600' htmlFor={'yearInput'}>
                            연도
                        </label>
                        <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1 focus-within:border-orange-200'>
                            <LiaCalendarAlt className='ml-1 h-7 w-7' />
                            <input
                                className='flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'
                                id={'yearInput'}
                                type={'number'}
                                value={values.year === 0 ? '' : values.year}
                                onChange={handleInputChange}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                            />
                        </div>
                    </div>
                    <div className='mb-12 flex w-full flex-col p-1'>
                        <span className='mx-2.5 mb-2 font-semibold text-gray-600'>학기</span>
                        <div className='flex items-center'>
                            <PiListNumbers className='h-7 w-7' />
                            <div className='mx-4 flex items-center'>
                                <input
                                    className='scale-125'
                                    id={'1stSemesterRadioButton'}
                                    type={'radio'}
                                    name={'semesterCheckRadioButton'}
                                    onChange={handleInputChange}
                                />
                                <label
                                    className='ml-2 mr-5 font-semibold text-gray-700'
                                    htmlFor={'1stSemesterRadioButton'}
                                >
                                    1학기
                                </label>
                                <input
                                    className='scale-125'
                                    id={'2ndSemesterRadioButton'}
                                    type={'radio'}
                                    name={'semesterCheckRadioButton'}
                                    onChange={handleInputChange}
                                />
                                <label className='ml-2 font-semibold text-gray-700' htmlFor={'2ndSemesterRadioButton'}>
                                    2학기
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-col'>
                        <span className='mx-2.5 mb-2 font-semibold text-gray-600'>시험 종류</span>
                        <div className='flex items-center'>
                            <PiExam className='ml-1 h-7 w-7' />
                            <div className='mx-4 flex items-center'>
                                <input
                                    className='scale-125'
                                    id={'midtermRadioButton'}
                                    type={'radio'}
                                    name={'examTypeCheckRadioButton'}
                                    onChange={handleInputChange}
                                />
                                <label className='ml-2 mr-5 font-semibold text-gray-700' htmlFor={'midtermRadioButton'}>
                                    중간고사
                                </label>
                                <input
                                    className='scale-125'
                                    id={'finalRadioButton'}
                                    type={'radio'}
                                    name={'examTypeCheckRadioButton'}
                                    onChange={handleInputChange}
                                />
                                <label className='ml-2 mr-5 font-semibold text-gray-700' htmlFor={'finalRadioButton'}>
                                    기말고사
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-8 flex w-3/5 flex-col'>
                    <div className='mb-12 flex w-full flex-col'>
                        <label className='mx-2.5 mb-2 font-semibold text-gray-600' htmlFor={'titleInput'}>
                            게시글 제목
                        </label>
                        <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1 focus-within:border-orange-200'>
                            <MdTitle className='ml-1 h-7 w-7' />
                            <input
                                className='flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'
                                id={'titleInput'}
                                type={'text'}
                                value={values.title}
                                onChange={handleInputChange}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                            />
                        </div>
                    </div>
                    <div className='mb-8 flex w-full flex-col'>
                        <span className='mx-2.5 mb-2 font-semibold text-gray-600'>게시글 내용</span>
                        <div className='rounded-xl border-2 border-gray-100 focus-within:border-orange-200'>
                            <QuillToolbar />
                            <ReactQuill
                                theme={'snow'}
                                modules={modules}
                                formats={formats}
                                value={values.bodyContent}
                                onChange={handleContentChange}
                                className='h-[20rem] rounded-b-xl border border-gray-100 bg-gray-100'
                            />
                        </div>
                    </div>
                    <div className='flex w-full items-center'>
                        <FileUpload
                            fileInformation={fileInformation}
                            onFileInputChange={handleFileInputChange}
                            onFileDeleteButtonClick={handleFileDelete}
                        />
                        <div className='ml-3 mt-10 flex w-1/5 items-center justify-center'>
                            <button
                                className='box-content rounded-2xl bg-orange-400 px-5 py-3  font-bold text-white shadow-md duration-300 enabled:cursor-pointer enabled:hover:scale-110 disabled:cursor-default disabled:opacity-75'
                                type={'submit'}
                                disabled={checkButtonDisabled()}
                            >
                                게시글 작성
                            </button>
                        </div>
                        <button type={'button'} onClick={foo()}>
                            테스트
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}
