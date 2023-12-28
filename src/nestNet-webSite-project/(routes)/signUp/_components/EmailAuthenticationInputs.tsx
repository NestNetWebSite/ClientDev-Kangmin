import axios from 'axios';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdOutlineCheck, MdOutlineCancel, MdOutlineMail, MdOutlineMarkEmailRead } from 'react-icons/md';
import { emailRegexp } from '../../../_constants/regexp/authRegexps';
import type { SignUpInputs } from '../page';

interface Props {
    isEmailAuthenticated: boolean;

    checkEmailAuthenticated(): void;
}

export default function EmailAuthenticationInputs({ isEmailAuthenticated, checkEmailAuthenticated }: Props) {
    const [isAuthenticationRequested, setIsAuthenticationRequested] = useState(false);
    const {
        register,
        getValues,
        getFieldState,
        formState: { errors },
    } = useFormContext<SignUpInputs>();

    const handleAuthenticationRequestButtonClick = () => {
        const emailAddress = getValues().emailAddress.trim();
        if (emailAddress === '' || getFieldState('emailAddress').invalid) {
            return;
        } else {
            if (
                window.confirm(
                    `입력한 이메일 주소는 ${emailAddress} 입니다. 이메일 주소가 정확한지 확인해주세요.\n(확인을 누르면, 인증 요청 버튼을 누를 수 없습니다.)`,
                )
            ) {
                axios
                    .post(
                        `${process.env.REACT_APP_BACKEND_URL}:8080/auth/mail-auth`,
                        { email: emailAddress },
                        {
                            withCredentials: true,
                        },
                    )
                    .then(() => {
                        window.alert('입력한 이메일 주소로 인증 코드가 발송되었습니다.');
                        setIsAuthenticationRequested(true);
                    });
            }
        }
    };

    const handleAuthenticationConfirmButtonClick = () => {
        const authenticationCode = getValues().authenticationCode.trim();
        if (authenticationCode === '' || getFieldState('authenticationCode').invalid) {
            return;
        } else {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}:8080/auth/mail-auth-answer`, { answer: authenticationCode })
                .then(response => {
                    console.log(response);
                    window.alert('인증되었습니다.');
                    checkEmailAuthenticated();
                })
                .catch(error => {
                    window.alert(error.response.data.error.message);
                });
            // if (authenticationCode === 'ASDFG') {
            //     window.alert('인증되었습니다.');
            //     checkEmailAuthenticated();
            // } else {
            //     window.alert('인증 코드를 다시 확인해주세요.');
            // }
        }
    };

    return (
        <>
            <div className={'my-4 flex flex-col'}>
                <div className={'flex items-center gap-x-3'}>
                    <div className={'flex flex-1 items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <MdOutlineMail className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            placeholder={'이메일'}
                            type={'email'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('emailAddress', {
                                required: { value: true, message: '이메일을 입력해주세요.' },
                                pattern: { value: emailRegexp, message: '유효한 이메일 주소를 입력해주세요.' },
                            })}
                            readOnly={isAuthenticationRequested}
                        />
                    </div>
                    <button
                        type={'button'}
                        className={
                            'rounded-xl bg-rose-800 px-3 py-4 text-sm font-semibold text-white shadow-lg duration-300 enabled:opacity-100 enabled:hover:scale-105 disabled:opacity-75'
                        }
                        onClick={handleAuthenticationRequestButtonClick}
                        disabled={isAuthenticationRequested}
                    >
                        인증 요청
                    </button>
                </div>
                {errors?.emailAddress?.message && errors?.emailAddress?.type === 'required' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.emailAddress.message}</span>
                )}
                {errors?.emailAddress?.message && errors?.emailAddress?.type === 'pattern' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.emailAddress.message}</span>
                )}
            </div>
            <div className={'my-4 flex flex-col'}>
                <div className={'flex items-center gap-x-3'}>
                    <div className={'flex flex-1 items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <MdOutlineMarkEmailRead className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            placeholder={'인증코드'}
                            type={'text'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('authenticationCode', {
                                required: { value: true, message: '인증코드를 입력해주세요.' },
                            })}
                            disabled={!isAuthenticationRequested}
                            readOnly={isEmailAuthenticated}
                        />
                        {isEmailAuthenticated ? (
                            <MdOutlineCheck className={'mr-1 h-7 w-7 text-green-400'} />
                        ) : (
                            <MdOutlineCancel className={'mr-1 h-7 w-7 text-red-400'} />
                        )}
                    </div>
                    <button
                        type={'button'}
                        className={
                            'rounded-xl bg-rose-800 px-3 py-4 text-sm font-semibold text-white shadow-lg duration-300 enabled:opacity-100 enabled:hover:scale-105 disabled:opacity-75'
                        }
                        onClick={handleAuthenticationConfirmButtonClick}
                        disabled={isEmailAuthenticated || !isAuthenticationRequested}
                    >
                        인증 확인
                    </button>
                </div>
                {errors?.authenticationCode?.message && errors?.authenticationCode?.type === 'required' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>
                        {errors.authenticationCode.message}
                    </span>
                )}
            </div>
        </>
    );
}
