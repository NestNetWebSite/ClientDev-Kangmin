import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import { TiSpanner } from 'react-icons/ti';
import ProfileUpdateForm from './ProfileUpdateForm';

interface Props {
    isModalOpen: boolean;

    onModalCloseButtonClick(): void;

    modalClose(): void;

    name: string;
    emailAddress: string;
    studentId: string;
    loginId: string;
    grade: number;
}

export default function ProfileUpdateModal({
    isModalOpen,
    onModalCloseButtonClick,
    modalClose,
    name,
    emailAddress,
    studentId,
    loginId,
    grade,
}: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            className={
                'fixed left-1/2 top-1/2 w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white px-7 py-4'
            }
            closeTimeoutMS={280}
        >
            <div className={'mb-6 flex items-center justify-between'}>
                <div className={'mx-3 flex items-center text-gray-600'}>
                    <TiSpanner className={'mr-1 h-6 w-6'} />
                    <span className={'text-lg font-semibold'}>개인 정보 수정</span>
                </div>
                <button
                    className={'z-20 mx-2 box-content rounded-full p-1 duration-300 hover:bg-gray-100'}
                    type={'button'}
                    onClick={onModalCloseButtonClick}
                >
                    <IoCloseOutline className={'h-8 w-8'} />
                </button>
            </div>
            <ProfileUpdateForm
                loginId={loginId}
                name={name}
                emailAddress={emailAddress}
                studentId={studentId}
                grade={grade}
                modalClose={modalClose}
            />
        </Modal>
    );
}
