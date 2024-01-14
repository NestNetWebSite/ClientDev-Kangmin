import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import useExamSearchFilterStore from '../../../../_stores/useExamSearchFilterStore';
import { useSearchParams } from 'react-router-dom';

interface ExamSearchFilter {
    year: string;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

type ExamSearchFilterInputs = ExamSearchFilter;

interface Props {
    updateCurrentSearchFilter(newSearchFilter: ExamSearchFilter): void;

    closeModal(): void;
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

export default function SearchFilterForm({ updateCurrentSearchFilter, closeModal }: Props) {
    const { examSearchFilter, filterUpdate } = useExamSearchFilterStore();
    const [_1, setSearchParams] = useSearchParams();
    const { control, register, reset, handleSubmit } = useForm<ExamSearchFilterInputs>({
        defaultValues: {
            year: examSearchFilter.year,
            semester: examSearchFilter.semester,
            examType: examSearchFilter.examType,
            subject: examSearchFilter.subject,
            professor: examSearchFilter.professor,
        },
    });

    const onSubmit: SubmitHandler<ExamSearchFilterInputs> = data => {
        filterUpdate(data);
        updateCurrentSearchFilter(data);
        closeModal();
    };

    return (
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'w-full'}>
                <div className={'mb-10 flex w-full flex-col'}>
                    <label className={'mx-3 mb-2 w-fit font-semibold text-slate-950'} htmlFor={'subjectInput'}>
                        강좌명
                    </label>
                    <input
                        className={
                            'flex-1 rounded-2xl px-4 py-3.5 outline outline-1 outline-gray-300 transition-all focus:outline-blue-500'
                        }
                        id={'subjectInput'}
                        type={'text'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('subject')}
                    />
                </div>
                <div className={'flex w-full gap-x-6'}>
                    <div className={'w-1/2'}>
                        <div className={'mb-6 flex flex-col'}>
                            <label className={'mx-3 mb-2 w-fit font-semibold text-slate-950'} htmlFor={'yearInput'}>
                                연도
                            </label>
                            <input
                                className={
                                    'flex-1 rounded-2xl px-4 py-3.5 outline outline-1 outline-gray-300 transition-all focus:outline-blue-500'
                                }
                                id={'yearInput'}
                                type={'number'}
                                min={0}
                                autoComplete={'off'}
                                autoCapitalize={'off'}
                                onWheel={event => {
                                    event.currentTarget.blur();
                                }}
                                {...register('year')}
                            />
                        </div>
                        <div className={'mb-10 flex flex-col'}>
                            <label className={'mx-3 mb-2 w-fit font-semibold text-slate-950'} htmlFor={'semesterInput'}>
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
                                            inputId={'semesterInput'}
                                            value={semesterSelectOptions.find(option => option.value === field.value)}
                                            classNames={{
                                                control(state) {
                                                    return `!rounded-2xl !h-[52px] !border !text-sm !shadow-none ${
                                                        state.isFocused ? '!border-blue-500' : '!border-gray-300'
                                                    } !transition-all`;
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
                            <label className={'mx-3 mb-2 w-fit font-semibold text-slate-950'} htmlFor={'examTypeInput'}>
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
                                            inputId={'examTypeInput'}
                                            value={examTypeSelectOptions.find(option => option.value === field.value)}
                                            classNames={{
                                                control(state) {
                                                    return `!rounded-2xl !h-[52px] !border !text-sm !shadow-none ${
                                                        state.isFocused ? '!border-blue-500' : '!border-gray-300'
                                                    } !transition-all`;
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
                            <label
                                className={'mx-3 mb-2 w-fit font-semibold text-slate-950'}
                                htmlFor={'professorInput'}
                            >
                                교수명
                            </label>
                            <input
                                className={
                                    'flex-1 rounded-2xl px-4 py-3.5 outline outline-1 outline-gray-300 transition-all focus:outline-blue-500'
                                }
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
            <div className={'my-2 flex items-center justify-end'}>
                <button
                    type={'submit'}
                    className={
                        'rounded-3xl bg-slate-950 px-12 py-3.5 font-semibold text-white transition-all hover:bg-slate-950/[.85]'
                    }
                >
                    필터 적용
                </button>
            </div>
        </form>
    );
}
