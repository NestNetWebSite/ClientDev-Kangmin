import { useFormContext } from 'react-hook-form';

interface Inputs {
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    title: string;
    bodyContent: string;
}

export default function ExamInfoInputs() {
    const {
        register,
        formState: { errors },
    } = useFormContext<Inputs>();

    return (
        <div className={'flex flex-col gap-y-7'}>
            <div className={'flex w-full flex-col'}>
                <div className={'mb-2 flex items-center gap-x-1'}>
                    <label className={'mx-2.5 font-bold text-slate-950'} htmlFor={'subjectInput'}>
                        강좌명
                    </label>
                    {errors?.subject?.message && errors?.subject?.type === 'required' && (
                        <span className={'text-sm text-red-500'}>※ {errors.subject.message}</span>
                    )}
                </div>
                <input
                    className={`flex-1 rounded-xl px-4 py-3 outline outline-1 ${
                        errors?.subject?.message ? 'outline-red-500' : 'outline-gray-300'
                    } ${
                        errors?.subject?.message ? 'focus:outline-red-500' : 'focus:outline-blue-500'
                    } transition-all placeholder:text-sm`}
                    id={'subjectInput'}
                    type={'text'}
                    placeholder={'필수 입력'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('subject', {
                        required: { value: true, message: '강좌명을 입력해주세요.' },
                    })}
                />
            </div>
            <div className={'flex w-full flex-col'}>
                <div className={'flex gap-x-1'}>
                    <label className={'mx-2.5 mb-2 font-bold text-slate-950'} htmlFor={'professorInput'}>
                        교수명
                    </label>
                    {errors?.professor?.message && errors?.professor?.type === 'required' && (
                        <span className={'text-sm text-red-500'}>※ {errors.professor.message}</span>
                    )}
                </div>
                <input
                    className={`flex-1 rounded-xl px-4 py-3 outline outline-1 ${
                        errors?.professor?.message ? 'outline-red-500' : 'outline-gray-300'
                    } ${
                        errors?.professor?.message ? 'focus:outline-red-500' : 'focus:outline-blue-500'
                    } transition-all placeholder:text-sm`}
                    id={'professorInput'}
                    type={'text'}
                    placeholder={'필수 입력'}
                    autoComplete={'off'}
                    autoCapitalize={'off'}
                    {...register('professor', {
                        required: { value: true, message: '교수명을 입력해주세요.' },
                    })}
                />
            </div>
            <div className={'flex w-full flex-col'}>
                <div className={'flex gap-x-1'}>
                    <label className={'mx-2.5 mb-2 font-bold text-slate-950'} htmlFor={'yearInput'}>
                        연도
                    </label>
                    {errors?.year?.message && errors?.year?.type === 'required' && (
                        <span className={'text-sm text-red-500'}>※ {errors.year.message}</span>
                    )}
                    {errors?.year?.message && errors?.year?.type === 'outOfRange' && (
                        <span className={'text-sm text-red-500'}>※ {errors.year.message}</span>
                    )}
                </div>
                <input
                    className={`flex-1 rounded-xl px-4 py-3 outline outline-1 ${
                        errors?.year?.message ? 'outline-red-500' : 'outline-gray-300'
                    } ${
                        errors?.year?.message ? 'focus:outline-red-500' : 'focus:outline-blue-500'
                    } transition-all placeholder:text-sm`}
                    id={'yearInput'}
                    type={'number'}
                    placeholder={'필수 입력'}
                    onWheel={event => {
                        event.currentTarget.blur();
                    }}
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
            <div className={'flex w-full flex-col p-1'}>
                <span className={'mx-2.5 mb-2 font-bold text-slate-950'}>학기</span>
                <div className={'flex items-center'}>
                    <input
                        className={'scale-125'}
                        defaultChecked
                        id={'1stSemesterRadioButton'}
                        type={'radio'}
                        value={'1'}
                        {...register('semester')}
                    />
                    <label className={'ml-2 mr-5 text-slate-950'} htmlFor={'1stSemesterRadioButton'}>
                        1학기
                    </label>
                    <input
                        className={'scale-125'}
                        id={'2ndSemesterRadioButton'}
                        type={'radio'}
                        value={'2'}
                        {...register('semester')}
                    />
                    <label className={'ml-2 text-slate-950'} htmlFor={'2ndSemesterRadioButton'}>
                        2학기
                    </label>
                </div>
            </div>
            <div className={'flex w-full flex-col'}>
                <span className={'mx-2.5 mb-2 font-bold text-slate-950'}>시험 종류</span>
                <div className={'flex items-center'}>
                    <input
                        className={'scale-125'}
                        defaultChecked
                        id={'midtermRadioButton'}
                        type={'radio'}
                        value={'MID'}
                        {...register('examType')}
                    />
                    <label className={'ml-2 mr-5 text-slate-950'} htmlFor={'midtermRadioButton'}>
                        중간고사
                    </label>
                    <input
                        className={'scale-125'}
                        id={'finalRadioButton'}
                        type={'radio'}
                        value={'FINAL'}
                        {...register('examType')}
                    />
                    <label className={'ml-2 mr-5 text-slate-950'} htmlFor={'finalRadioButton'}>
                        기말고사
                    </label>
                </div>
            </div>
        </div>
    );
}
