import axios from 'axios';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut, BiUserPin } from 'react-icons/bi';

export default function LoginStatusArea() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleLogoutTextClick = useCallback(() => {
        const accessToken = localStorage.getItem('access_token');
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}:8080/auth/logout`, {
                headers: { Authorization: `${accessToken}` },
            })
            .then((response) => {
                localStorage.removeItem('access_token');
                window.alert(response.data.response);
                navigate('/');
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={'flex flex-1 items-center justify-end'}>
            <div className={'mx-3 flex items-center text-slate-500 duration-300 hover:text-slate-800'}>
                <BiUserPin className={'mr-1.5 h-5 w-5'} />
                <Link to={'/user'} className={'font-semibold'}>
                    마이페이지
                </Link>
            </div>
            <div className={'mx-3 flex items-center text-slate-500 duration-300 hover:text-red-400'}>
                <BiLogOut className={'mr-1.5 h-5 w-5'} />
                <span
                    className={'font-semibold'}
                    onClick={(): void => {
                        handleLogoutTextClick();
                    }}
                >
                    로그아웃
                </span>
            </div>
        </div>
    );
}
