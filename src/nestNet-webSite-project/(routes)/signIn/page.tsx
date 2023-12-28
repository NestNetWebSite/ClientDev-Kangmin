import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiEye, FiEyeOff, FiLock, FiUser } from 'react-icons/fi';

interface SignInInputs {
    loginId: string;
    password: string;
}

export default function Component() {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInInputs>({ mode: 'onBlur' });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SignInInputs> = (data) => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}:8080/auth/login`, data, { withCredentials: true })
            .then((response) => {
                window.localStorage.setItem('access_token', response.data.response.Authorization[0]);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.response.data);
                window.alert(error.response.data.error.message);
            });
    };

    const handlePasswordVisibilityToggleButtonClick = useCallback(
        () => setIsPasswordVisible((prevState) => !prevState),
        [],
    );

    return (
        <div className={'mx-auto flex w-[36rem] flex-col items-center'}>
            <header className={'mb-5 mt-14'}>
                <Link to={'/'} className={'text-4xl font-semibold tracking-wider text-rose-800'}>
                    NEST NET
                </Link>
            </header>
            <main className={'w-full'}>
                <form className={'flex w-full flex-col items-center p-4'} onSubmit={handleSubmit(onSubmit)}>
                    <div className={'mb-3 flex w-full flex-col rounded-lg border border-gray-200 p-14'}>
                        <div className={'mb-7 flex flex-col'}>
                            <div
                                className={
                                    'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'
                                }
                            >
                                <FiUser className={'ml-1 h-7 w-7'} />
                                <input
                                    className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                                    type={'text'}
                                    placeholder={'아이디'}
                                    autoComplete={'off'}
                                    autoCapitalize={'off'}
                                    {...register('loginId', {
                                        required: { value: true, message: '아이디를 입력해주세요.' },
                                    })}
                                />
                            </div>
                            {errors.loginId?.message && (
                                <span className={'m-1 text-sm font-semibold text-red-500'}>
                                    {errors.loginId.message}
                                </span>
                            )}
                        </div>
                        <div className={'mb-10 flex flex-col'}>
                            <div
                                className={
                                    'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'
                                }
                            >
                                <FiLock className={'ml-1 h-7 w-7'} />
                                <input
                                    className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder={'비밀 번호'}
                                    autoComplete={'off'}
                                    autoCapitalize={'off'}
                                    {...register('password', {
                                        required: { value: true, message: '비밀 번호를 입력해주세요.' },
                                    })}
                                />
                                <button type={'button'} onClick={handlePasswordVisibilityToggleButtonClick}>
                                    {isPasswordVisible ? (
                                        <FiEye className={'mr-3.5 h-7 w-7 text-gray-500'} />
                                    ) : (
                                        <FiEyeOff className={'mr-3.5 h-7 w-7 text-gray-500'} />
                                    )}
                                </button>
                            </div>
                            {errors.password?.message && (
                                <span className={'m-1 text-sm font-semibold text-red-500'}>
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className={'mb-3 flex w-full items-center justify-center'}>
                            <button
                                className={'w-full rounded-lg bg-rose-800 py-3 text-lg font-semibold text-white shadow'}
                                type={'submit'}
                            >
                                로그인
                            </button>
                        </div>
                        <div className={'flex items-center justify-between gap-x-7 p-2'}>
                            <Link
                                to={'/idpw-search'}
                                className={'text-sm font-semibold text-slate-500 duration-300 hover:text-slate-800'}
                            >
                                아이디 / 비밀 번호 찾기
                            </Link>
                            <Link
                                to={'/signup'}
                                className={'text-sm font-semibold text-slate-500 duration-300 hover:text-slate-800'}
                            >
                                회원 가입
                            </Link>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
