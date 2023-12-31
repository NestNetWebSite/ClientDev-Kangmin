import axios from 'axios';
import { omit } from 'lodash';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import AuthInputs from './_components/AuthInputs';
import EmailAuthenticationInputs from './_components/EmailAuthenticationInputs';
import PersonalInformationInputs from './_components/PersonalInformationInputs';
import StudentsInputs from './_components/StudentsInputs';
import GraduateInput from './_components/GraduateInputs';

export type SignUpInputs = {
    loginId: string;
    loginPassword: string;
    confirmPassword: string;
    name: string;
    emailAddress: string;
    authenticationCode: string;
    graduated: string | boolean;
    graduateYear: number | null;
    studentId: string | null;
    grade: number | null;
    memberAuthority: string;
};

export default function Component() {
    const methods = useForm<SignUpInputs>({ mode: 'onBlur' });
    const [isEmailAuthenticated, setIsEmailAuthenticated] = useState(false);
    const [graduates, setGraduates] = useState(false);
    const navigate = useNavigate();

    const checkEmailAuthenticated = useCallback(() => {
        setIsEmailAuthenticated(prevState => !prevState);
    }, []);

    const handleRadioButtonClick = useCallback((event: MouseEvent<HTMLElement>) => {
        if ((event.target as HTMLInputElement).value === 'yes') {
            methods.resetField('grade');
            methods.resetField('studentId');
            methods.setValue('memberAuthority', 'GENERAL_MEMBER');
            methods.unregister(['grade', 'studentId']);
            setGraduates(true);
        } else {
            methods.resetField('graduateYear');
            methods.unregister(['graduateYear']);
            setGraduates(false);
        }
    }, []);

    const onSubmit: SubmitHandler<SignUpInputs> = data => {
        if (!isEmailAuthenticated) {
            window.alert('이메일 인증을 완료해주세요.');
            return;
        }
        const signUpInformation: Omit<SignUpInputs, 'authenticationCode' | 'confirmPassword'> = omit(data, [
            'confirmPassword',
            'authenticationCode',
        ]);
        if (graduates) {
            signUpInformation.graduated = true;
            signUpInformation.grade = null;
            signUpInformation.studentId = null;
            signUpInformation.graduateYear = Number(signUpInformation.graduateYear);
        } else {
            signUpInformation.graduated = false;
            signUpInformation.graduateYear = null;
            signUpInformation.grade = Number(signUpInformation.grade);
        }

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}:8080/auth/signup`, signUpInformation, { withCredentials: true })
            .then(response => {
                window.alert(response.data.response);
                navigate('/signin');
            })
            .catch(error => {
                window.alert(error.response.data.error.message);
            });
    };

    useEffect(() => {
        methods.unregister(['graduateYear']);
    }, []);

    return (
        <div className={'mx-auto mt-7 flex w-[32rem] flex-col p-3'}>
            <header>
                <Link to={'/'} className={'mx-2 text-[1.8rem] font-semibold tracking-wider text-rose-800'}>
                    NEST NET
                </Link>
            </header>
            <main>
                <FormProvider {...methods}>
                    <form className={'flex w-full flex-col'} onSubmit={methods.handleSubmit(onSubmit)}>
                        <AuthInputs />
                        <div className={'flex w-full flex-col'}>
                            <EmailAuthenticationInputs
                                isEmailAuthenticated={isEmailAuthenticated}
                                checkEmailAuthenticated={checkEmailAuthenticated}
                            />
                        </div>
                        <PersonalInformationInputs onRadioButtonClick={handleRadioButtonClick} />
                        <hr />
                        <AnimatePresence mode={'wait'} initial={false}>
                            {graduates ? (
                                <motion.div
                                    key={'graduateInputs'}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1.0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'linear', ease: 'linear' }}
                                    className={'flex flex-col'}
                                >
                                    <GraduateInput />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={'studentInputs'}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1.0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'linear', ease: 'linear' }}
                                    className={'flex flex-col'}
                                >
                                    <StudentsInputs />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button
                            className={
                                'mb-4 mt-6 w-full rounded-xl bg-rose-800 py-3 text-lg font-semibold text-white shadow'
                            }
                        >
                            회원가입
                        </button>
                    </form>
                </FormProvider>
            </main>
        </div>
    );
}
