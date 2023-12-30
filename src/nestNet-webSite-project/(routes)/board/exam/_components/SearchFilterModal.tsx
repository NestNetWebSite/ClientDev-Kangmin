import Modal from 'react-modal';
import { IoCloseOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import SearchFilterForm from './SearchFilterForm';

interface Props {
    isModalOpen: boolean;

    onModalCloseButtonClick(): void;

    modalClose(): void;
}

export default function SearchFilterModal({ isModalOpen, onModalCloseButtonClick, modalClose }: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            closeTimeoutMS={280}
            className={
                'fixed left-1/2 top-1/2 w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white px-10 py-7'
            }
        >
            <div className='mb-6 flex items-center justify-between'>
                <div className='mx-3 flex items-center'>
                    <IoIosSearch className='mr-2 h-7 w-7 text-gray-600' />
                    <span className='text-xl font-semibold text-gray-600'>검색 조건 설정</span>
                </div>
                <button
                    type={'button'}
                    onClick={onModalCloseButtonClick}
                    className='z-20 mx-3 box-content rounded-full p-1 duration-300 hover:bg-gray-100'
                >
                    <IoCloseOutline className={'h-9 w-9'} />
                </button>
            </div>
            <SearchFilterForm modalClose={modalClose} />
        </Modal>
    );
}
