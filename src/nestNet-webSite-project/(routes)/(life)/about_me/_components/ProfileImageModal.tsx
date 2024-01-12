import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';

interface Props {
    isModalOpen: boolean;
    profileImageSrc: string;

    onModalCloseButtonClick(): void;
}

export default function ProfileImageModal({ isModalOpen, profileImageSrc, onModalCloseButtonClick }: Props) {
    return (
        <Modal
            isOpen={isModalOpen}
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 50%)', zIndex: 10 } }}
            className={'fixed left-1/2 top-1/2 w-[40rem] -translate-x-1/2 -translate-y-1/2 focus:outline-none'}
            closeTimeoutMS={280}
            ariaHideApp={false}
        >
            <button
                className={
                    'absolute -left-14 -top-2 box-content rounded-full p-1 text-white transition-all hover:bg-black/[.20]'
                }
                onClick={onModalCloseButtonClick}
            >
                <IoMdClose className={'h-10 w-10'} />
            </button>
            <img className={'w-full'} src={profileImageSrc} alt={'userProfileImage'} />
        </Modal>
    );
}
