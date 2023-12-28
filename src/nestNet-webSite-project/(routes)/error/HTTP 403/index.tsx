import { Navigate } from 'react-router-dom';

export default function Component() {
    return (
        <main className={'mt-12'}>
            <strong>권한이 없습니다.</strong>
            <button type={'button'} onClick={() => <Navigate to={'/'} replace={true} />}>
                홈으로
            </button>
        </main>
    );
}
