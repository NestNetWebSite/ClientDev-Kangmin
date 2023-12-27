import Select from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { LiaIdCard } from 'react-icons/lia';
import { PiListNumbersLight } from 'react-icons/pi';
import type { SignUpInputs } from '../index';

export default function StudentsInputs() {
    const {
        register,
        control,
        getValues,
        formState: { errors },
    } = useFormContext<SignUpInputs>();

    return (
        <>
            <div className={'my-4 flex flex-col'}>
                <div className={'flex flex-1 items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                    <PiListNumbersLight className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                        placeholder={'학년'}
                        type={'number'}
                        autoComplete={'off'}
                        {...register('grade', {
                            required: { value: true, message: '학년을 입력해주세요.' },
                            validate: {
                                outOfRange(value) {
                                    return (value > 0 && value <= 10) || '학년 범위는 1학년 이상 10학년 이하 입니다.';
                                },
                            },
                        })}
                    />
                </div>
                {errors?.grade?.message && errors?.grade?.type === 'required' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.grade.message}</span>
                )}
                {errors?.grade?.message && errors?.grade?.type === 'outOfRange' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.grade.message}</span>
                )}
            </div>
            <div className={'my-4 flex flex-col'}>
                <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                    <LiaIdCard className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                        placeholder={'학번'}
                        autoComplete={'off'}
                        {...register('studentId', {
                            required: { value: true, message: '학번을 입력해주세요.' },
                            maxLength: { value: 15, message: '학번은 15자 이하여야 합니다.' },
                        })}
                    />
                </div>
                {errors?.studentId?.message && errors?.studentId?.type === 'required' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.studentId.message}</span>
                )}
                {errors?.studentId?.message && errors?.studentId?.type === 'maxLength' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.studentId.message}</span>
                )}
            </div>
            <div className={'my-5 flex flex-col'}>
                <span className={'mx-2 mb-2 font-semibold text-gray-500'}>권한 선택</span>
                <Controller
                    control={control}
                    name={'memberAuthority'}
                    defaultValue={'GENERAL_MEMBER'}
                    render={({ field }) => {
                        return (
                            <Select
                                classNames={{
                                    control() {
                                        return '!rounded-lg !h-[52px] !border !border-gray-100 !bg-gray-100 !border-2 !text-sm !shadow-none';
                                    },

                                    option() {
                                        return '!text-sm';
                                    },
                                }}
                                placeholder={'권한 선택'}
                                options={[
                                    { value: 'PRESIDENT', label: '회장' },
                                    { value: 'VICE_PRESIDENT', label: '부회장' },
                                    { value: 'MANAGER', label: '관리자' },
                                    { value: 'GENERAL_MEMBER', label: '재학생' },
                                ]}
                                defaultValue={{ value: 'GENERAL_MEMBER', label: '재학생' }}
                                ref={field.ref}
                                onChange={(option) => field.onChange(option.value)}
                                menuPlacement={'auto'}
                            />
                        );
                    }}
                />
            </div>
        </>
    );
}
