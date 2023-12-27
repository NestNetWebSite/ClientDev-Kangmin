import { useFormContext } from 'react-hook-form';
import { FiCalendar } from 'react-icons/fi';
import type { SignUpInputs } from '../index';

export default function GraduateInput() {
    const {
        register,
        getValues,
        formState: { errors },
    } = useFormContext<SignUpInputs>();

    return (
        <>
            <div className={'my-5'}>
                <div className={'flex flex-1 items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                    <FiCalendar className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                        placeholder={'졸업 연도'}
                        type={'number'}
                        autoComplete={'off'}
                        {...register('graduateYear', {
                            required: { value: true, message: '졸업 연도를 입력해주세요.' },
                            validate: {
                                outOfRange() {
                                    const graduateYear = getValues().graduateYear;
                                    return (
                                        (graduateYear >= 2000 && graduateYear <= new Date().getFullYear()) ||
                                        '졸업 연도 범위는 2000년 이상 현재 연도 이하 입니다.'
                                    );
                                },
                            },
                        })}
                    />
                </div>
                {errors?.graduateYear?.message && errors?.graduateYear?.type === 'required' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.graduateYear.message}</span>
                )}
                {errors?.graduateYear?.message && errors?.graduateYear?.type === 'outOfRange' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.graduateYear.message}</span>
                )}
            </div>
        </>
    );
}
