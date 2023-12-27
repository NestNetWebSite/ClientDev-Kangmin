import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMail } from 'react-icons/md';

interface SearchIdInputs {
    name: string;
    emailAddress: string;
}

export default function SearchId() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchIdInputs>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<SearchIdInputs> = (data) => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}:8080/member/find-id`, data, { withCredentials: true })
            .then((response) => {
                window.alert(response.data.response);
                navigate('/signin');
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className={'mt-14 w-full'}>
            <h1 className={'mx-8 text-2xl font-semibold text-gray-600'}>아이디</h1>
            <form className={'flex w-full flex-col items-center px-6 py-3.5'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'my-4 flex w-full flex-col'}>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <FiUser className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            type={'text'}
                            placeholder={'이름'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('name', { required: { value: true, message: '이름을 입력해주세요.' } })}
                        />
                    </div>
                    {errors?.name?.message && errors?.name?.type === 'required' && (
                        <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.name.message}</span>
                    )}
                </div>
                <div className={'my-4 flex w-full flex-col'}>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <MdOutlineMail className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            type={'email'}
                            placeholder={'이메일'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('emailAddress', {
                                required: { value: true, message: '이메일을 입력해주세요.' },
                            })}
                        />
                    </div>
                    {errors?.emailAddress?.message && errors?.emailAddress?.type === 'required' && (
                        <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.emailAddress.message}</span>
                    )}
                </div>
                <div className={'my-4 w-full'}>
                    <button className={'w-full rounded-lg bg-rose-800 py-3 text-lg font-semibold text-white shadow'}>
                        아이디 조회
                    </button>
                </div>
            </form>
        </div>
    );
}
