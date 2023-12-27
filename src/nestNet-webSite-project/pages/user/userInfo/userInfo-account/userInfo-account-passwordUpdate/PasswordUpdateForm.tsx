import axios from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AuthenticationInput from './AuthenticationInput';
import { passwordRegexp } from '../../../../../constants/regexp/authRegexps';

export type Inputs = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function PasswordUpdateForm({ modalClose }: { modalClose(): void }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const methods = useForm<Inputs>({ mode: 'onBlur' });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}:8080/member/change-pw`,
                { password: data.newPassword },
                {
                    withCredentials: true,
                    headers: { Authorization: localStorage.getItem('access_token') },
                },
            )
            .then(() => {
                window.alert('비밀번호를 변경하였습니다.');
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                modalClose();
            });
    };

    return (
        <FormProvider {...methods}>
            <form className={'w-full'} onSubmit={methods.handleSubmit(onSubmit)}>
                <AuthenticationInput
                    isAuthenticated={isAuthenticated}
                    checkAuthentication={(): void => {
                        setIsAuthenticated(true);
                    }}
                />
                <hr />
                <div className={`${isAuthenticated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={'my-6 flex w-full flex-col'}>
                        <input
                            className={'w-full rounded-lg bg-gray-100 px-4 py-3 focus:outline-none'}
                            id={'newPasswordInput'}
                            type={'password'}
                            placeholder={'새 비밀번호'}
                            disabled={!isAuthenticated}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...methods.register('newPassword', {
                                required: { value: true, message: '새 비밀번호를 입력해주세요.' },
                                pattern: {
                                    value: passwordRegexp,
                                    message: '8~20자의 알파벳, 숫자, 특수문자를 반드시 포함해야 합니다.',
                                },
                            })}
                        />
                        {methods.formState.errors?.newPassword?.message &&
                            methods.formState.errors?.newPassword?.type === 'required' && (
                                <span className={'m-1 text-sm font-semibold text-red-500'}>
                                    {methods.formState.errors.newPassword.message}
                                </span>
                            )}
                        {methods.formState.errors?.newPassword?.message &&
                            methods.formState.errors?.newPassword?.type === 'pattern' && (
                                <span className={'m-1 text-sm font-semibold text-red-500'}>
                                    {methods.formState.errors.newPassword.message}
                                </span>
                            )}
                    </div>
                    <div className={'mb-6 flex w-full flex-col'}>
                        <input
                            className={'w-full rounded-lg bg-gray-100 px-4 py-3 focus:outline-none'}
                            id={'confirmPasswordInput'}
                            type={'password'}
                            placeholder={'비밀번호 확인'}
                            disabled={!isAuthenticated}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...methods.register('confirmPassword', {
                                required: { value: true, message: '비밀번호를 입력해주세요.' },
                                validate: {
                                    notMatched() {
                                        const { newPassword, confirmPassword } = methods.getValues();
                                        return (
                                            newPassword === confirmPassword ||
                                            '위에서 입력한 비밀번호와 일치하지 않습니다.'
                                        );
                                    },
                                },
                            })}
                        />
                        {methods.formState.errors?.confirmPassword?.message &&
                            methods.formState.errors?.confirmPassword?.type === 'required' && (
                                <span className={'m-1 text-sm font-semibold text-red-500'}>
                                    {methods.formState.errors.confirmPassword.message}
                                </span>
                            )}
                        {methods.formState.errors?.confirmPassword?.message &&
                            methods.formState.errors?.confirmPassword?.type === 'notMatched' && (
                                <span className={'m-1 text-sm font-semibold text-red-500'}>
                                    {methods.formState.errors.confirmPassword.message}
                                </span>
                            )}
                    </div>
                </div>
                <div className={'flex w-full items-center justify-end'}>
                    <button
                        className={
                            'rounded-2xl bg-rose-800 px-4 py-2 font-semibold text-white duration-300 disabled:opacity-75'
                        }
                        type={'submit'}
                        disabled={!isAuthenticated}
                    >
                        비밀번호 변경
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
