import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

export default function SearchPassword() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ loginId: string }>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<{ loginId: string }> = (data) => {
        console.log(data);
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}:8080/member/get-temp-pw`, data)
            .then((response) => {
                window.alert(response.data.response);
                navigate('/signin');
            })
            .catch((error) => {
                window.alert(error.response.data.error.message);
            });
    };

    return (
        <div className={'mt-12 w-full'}>
            <h1 className={'mx-8 text-2xl font-semibold text-gray-600'}>비밀번호</h1>
            <form className={'flex w-full flex-col items-center px-6 py-3.5'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'my-4 flex w-full flex-col'}>
                    <div className={'flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-100 p-1'}>
                        <FiUser className={'ml-1 h-7 w-7'} />
                        <input
                            className={'flex-1 rounded-lg bg-gray-100 px-3 py-2 focus:outline-none'}
                            type={'text'}
                            placeholder={'아이디'}
                            autoComplete={'off'}
                            autoCapitalize={'off'}
                            {...register('loginId', { required: { value: true, message: '아이디를 입력해주세요.' } })}
                        />
                    </div>
                    {errors?.loginId?.message && errors?.loginId?.type === 'required' && (
                        <span className={'m-1 text-sm font-semibold text-red-500'}>{errors.loginId.message}</span>
                    )}
                </div>
                <div className={'my-4 w-full'}>
                    <button className={'w-full rounded-lg bg-rose-800 py-3 text-lg font-semibold text-white shadow'}>
                        비밀번호 조회
                    </button>
                </div>
            </form>
        </div>
    );
}
