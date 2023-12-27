import axios from 'axios';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Inputs } from './PasswordUpdateForm';

interface Props {
    isAuthenticated: boolean;

    checkAuthentication(): void;
}

export default function AuthenticationInput({ isAuthenticated, checkAuthentication }: Props) {
    const {
        register,
        getValues,
        getFieldState,
        formState: { errors },
    } = useFormContext<Inputs>();

    const handleButtonClick = useCallback(() => {
        const currentPassword = getValues().currentPassword;
        if (currentPassword === '' || getFieldState('currentPassword').invalid) {
            return;
        }
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:8080/member/check-pw`,
                { password: currentPassword },
                {
                    withCredentials: true,
                    headers: { Authorization: localStorage.getItem('access_token') },
                },
            )
            .then(() => {
                window.alert('사용자 인증에 성공하였습니다.');
                checkAuthentication();
            })
            .catch(() => {
                window.alert('사용자 인증에 실패하였습니다.');
            });
    }, []);

    return (
        <div className={`w-full ${isAuthenticated ? 'opacity-75' : 'opacity-100'}`}>
            <div className={'mb-6 flex w-full flex-col'}>
                <label className={'mx-2 mb-2 font-semibold text-gray-500'} htmlFor={'currentPasswordInput'}>
                    사용자 인증
                </label>
                <div className={'flex gap-x-3'}>
                    <input
                        className={'flex-1 rounded-lg bg-gray-100 px-4 py-3 focus:outline-none'}
                        type={'password'}
                        placeholder={'현재 비밀번호'}
                        disabled={isAuthenticated}
                        autoComplete={'off'}
                        autoCapitalize={'off'}
                        {...register('currentPassword', {
                            required: { value: true, message: '비밀번호를 입력해주세요.' },
                        })}
                    />
                    <button
                        className={
                            'flex cursor-pointer items-center justify-center rounded-2xl bg-rose-800 px-3.5 py-1 text-[0.9rem] font-semibold text-white shadow'
                        }
                        type={'button'}
                        onClick={handleButtonClick}
                    >
                        인증
                    </button>
                </div>
                {errors?.currentPassword?.message && errors.currentPassword?.type === 'required' && (
                    <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.currentPassword.message}</span>
                )}
            </div>
        </div>
    );
}
