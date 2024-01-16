import { useNavigate } from 'react-router-dom';

export default function Page() {
    const navigate = useNavigate();
    return (
        <div className={'flex h-[100dvh] w-full items-center justify-center'}>
            <div className={'flex w-[38rem] flex-col'}>
                <img className={'w-full rounded-2xl'} src={'/네스트넷-404.png'} alt={'404_image'} />
                <h2 className={'my-4 text-center text-3xl font-black text-rose-800'}>
                    해당 페이지를 찾을 수 없습니다.
                </h2>
                <p className={'font-bold text-gray-600'}>
                    요청하신 페이지의 주소가 변경되었거나, 삭제되었습니다. 올바른 주소를 입력해 주세요.
                </p>
                <div className={'my-9 flex justify-center gap-x-7'}>
                    <button
                        className={'rounded-xl border border-black px-4 py-3 font-bold text-black'}
                        type={'button'}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        이전 페이지
                    </button>
                    <button
                        className={
                            'rounded-xl border border-black bg-black px-4 py-3 font-bold text-white transition-all hover:bg-black/[.85]'
                        }
                        type={'button'}
                        onClick={() => {
                            navigate('/', { replace: true });
                        }}
                    >
                        메인으로
                    </button>
                </div>
            </div>
        </div>
    );
}
