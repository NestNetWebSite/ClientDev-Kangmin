import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { GrPowerReset } from 'react-icons/gr';
import Select from 'react-select';
import useExamSearchFilterStore from '../../../../_stores/useExamSearchFilterStore';
import { useCallback } from 'react';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { PiBooks } from 'react-icons/pi';

interface ExamSearchFilterInputs {
    year: number;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

const semesterSelectOptions = [
    { value: '1', label: '1학기' },
    { value: '2', label: '2학기' },
    { value: '0', label: '선택안함.' },
];

const examTypeSelectOptions = [
    { value: 'MID', label: '중간고사' },
    { value: 'FINAL', label: '기말고사' },
    { value: '', label: '선택안함.' },
];

export default function SearchFilterForm({ closeModal }: { closeModal(): void }) {
    const { examSearchFilter, filterUpdate } = useExamSearchFilterStore();
    const {
        control,
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ExamSearchFilterInputs>({
        mode: 'onBlur',
        defaultValues: {
            year: examSearchFilter.year,
            semester: examSearchFilter.semester,
            examType: examSearchFilter.examType,
            subject: examSearchFilter.subject,
            professor: examSearchFilter.professor,
        },
    });

    const handleFormResetButtonClick = useCallback(() => {
        reset({ year: 0, semester: '0', examType: '', subject: '', professor: '' });
    }, []);

    const onSubmit: SubmitHandler<ExamSearchFilterInputs> = data => {
        filterUpdate(data);
        closeModal();
    };

    return (
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'w-full'}>
                <div className={'mb-10 flex w-full flex-col'}>
                    <label className={'mx-2 mb-2 font-semibold text-gray-500'} htmlFor={'subjectInput'}>
                        강좌명
                    </label>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <PiBooks className='ml-1 h-7 w-7' />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            id={'subjectInput'}
                            type={'text'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('subject')}
                        />
                    </div>
                </div>
                <div className={'flex w-full gap-x-6'}>
                    <div className={'w-1/2'}>
                        <div className={'mb-6 flex w-full flex-col'}>
                            <label className={'mx-2 mb-2 font-semibold text-gray-500'} htmlFor={'yearInput'}>
                                연도
                            </label>
                            <div
                                className={
                                    'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'
                                }
                            >
                                <LiaChalkboardTeacherSolid className='ml-1 h-7 w-7' />
                                <input
                                    className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                                    id={'yearInput'}
                                    type={'number'}
                                    min={0}
                                    autoComplete={'off'}
                                    autoCapitalize={'off'}
                                    {...register('year')}
                                />
                            </div>
                        </div>
                        <div className={'mb-10 flex flex-col'}>
                            <label className={'mx-2 mb-2 font-semibold text-gray-500'} htmlFor={'yearInput'}>
                                학기
                            </label>
                            <Controller
                                control={control}
                                name={'semester'}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            isSearchable={false}
                                            options={semesterSelectOptions}
                                            onChange={option => field.onChange(option.value)}
                                            ref={field.ref}
                                            defaultValue={semesterSelectOptions.find(
                                                option => option.value === field.value,
                                            )}
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
                    </div>
                    <div className={'w-1/2'}>
                        <div className={'mb-6 flex flex-col'}>
                            <label className={'mx-2 mb-2 font-semibold text-gray-500'} htmlFor={'yearInput'}>
                                시험 종류
                            </label>
                            <Controller
                                control={control}
                                name={'examType'}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            isSearchable={false}
                                            options={examTypeSelectOptions}
                                            onChange={option => field.onChange(option.value)}
                                            ref={field.ref}
                                            defaultValue={examTypeSelectOptions.find(
                                                option => option.value === field.value,
                                            )}
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
                        <div className={'flex w-full flex-col'}>
                            <label className={'mx-2 mb-2 font-semibold text-gray-500'} htmlFor={'professorInput'}>
                                교수명
                            </label>
                            <div
                                className={
                                    'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'
                                }
                            >
                                <LiaChalkboardTeacherSolid className='ml-1 h-7 w-7' />
                                <input
                                    className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                                    id={'professorInput'}
                                    type={'text'}
                                    autoComplete={'off'}
                                    autoCapitalize={'off'}
                                    {...register('professor')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'my-2 flex items-center justify-between'}>
                <button
                    className='box-content flex items-center rounded-3xl px-3 py-2 duration-300 hover:bg-gray-100'
                    type={'button'}
                    onClick={handleFormResetButtonClick}
                >
                    <GrPowerReset className={'mr-2 h-6 w-6'} />
                    <span className={'font-semibold'}>초기화</span>
                </button>
                <button
                    type={'submit'}
                    className={
                        'rounded-2xl bg-rose-800 px-6 py-2 font-semibold text-white shadow-md duration-300 hover:scale-105'
                    }
                >
                    필터 적용
                </button>
            </div>
        </form>
    );
}
