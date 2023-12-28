import Modal from 'react-modal';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import PasswordUpdateForm from './PasswordUpdateForm';

interface Props {
    isModalOpen: boolean;

    onModalCloseButtonClick(): void;

    modalClose(): void;
}

export default function PasswordUpdateModal({ isModalOpen, onModalCloseButtonClick, modalClose }: Props) {
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
                    <MdOutlineManageAccounts className={'mr-1 h-6 w-6'} />
                    <span className={'text-lg font-semibold'}>새 비밀번호 설정</span>
                </div>
                <button
                    className={'z-20 mx-2 box-content rounded-full p-1 duration-300 hover:bg-gray-100'}
                    type={'button'}
                    onClick={onModalCloseButtonClick}
                >
                    <IoCloseOutline className={'h-8 w-8'} />
                </button>
            </div>
            <PasswordUpdateForm modalClose={modalClose} />
        </Modal>
    );
}
