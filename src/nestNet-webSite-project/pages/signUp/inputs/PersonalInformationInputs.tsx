import { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiUser } from 'react-icons/fi';
import { GiGraduateCap } from 'react-icons/gi';
import type { SignUpInputs } from '../index';

interface Props {
    onRadioButtonClick(event: MouseEvent): void;
}

export default function PersonalInformationInputs({ onRadioButtonClick }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignUpInputs>();

    return (
        <>
            <div className={'my-4 flex flex-col'}>
                <div className={'flex flex-1 items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                    <FiUser className={'ml-1 h-7 w-7'} />
                    <input
                        className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                        placeholder={'이름'}
                        type={'text'}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('name', { required: { value: true, message: '이름을 입력해주세요.' } })}
                    />
                </div>
                {errors?.name?.message && errors?.name?.type === 'required' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.name.message}</span>
                )}
            </div>
            <div className={'my-4 flex flex-col'}>
                <span className={'mx-2 mb-2 font-semibold text-gray-500'}>졸업 여부 선택</span>
                <div className={'flex items-center'}>
                    <GiGraduateCap className={'ml-2.5 h-7 w-7'} />
                    <div className={'mx-4 flex items-center'}>
                        <input
                            className={'scale-125'}
                            type={'radio'}
                            value={'no'}
                            defaultChecked={true}
                            onClick={onRadioButtonClick}
                            {...register('graduated')}
                        />
                        <span className={'ml-2 mr-8 font-semibold text-gray-700'}>졸업 안 함</span>
                        <input
                            className={'scale-125'}
                            type={'radio'}
                            value={'yes'}
                            onClick={onRadioButtonClick}
                            {...register('graduated')}
                        />
                        <span className={'ml-2 font-semibold text-gray-700'}>졸업 함</span>
                    </div>
                </div>
            </div>
        </>
    );
}
