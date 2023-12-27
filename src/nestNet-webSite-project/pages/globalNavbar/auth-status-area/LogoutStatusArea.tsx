import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function LogoutStatusArea() {
    return (
        <div className={'flex flex-1 items-center justify-end'}>
            <div className={'mx-3 flex items-center text-slate-500 hover:text-slate-800'}>
                <FiLogIn className={'mr-1.5 h-5 w-5'} />
                <Link className={'font-semibold'} to={'/signin'}>
                    로그인
                </Link>
            </div>
            <div className={'mx-3 flex items-center text-slate-500 hover:text-slate-800'}>
                <FiUserPlus className={'mr-1.5 h-5 w-5'} />
                <Link className={'font-semibold'} to={'/signup'}>
                    회원가입
                </Link>
            </div>
        </div>
    );
}
