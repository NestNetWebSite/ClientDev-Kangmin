import { useCallback, useState } from 'react';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { PiSignOut } from 'react-icons/pi';
import { TiSpanner } from 'react-icons/ti';
import ProfileUpdateModal from './userInfo-account-profileUpdate/ProfileUpdateModal';
import PasswordUpdateModal from './userInfo-account-passwordUpdate/PasswordUpdateModal';

interface Props {
    name: string;
    emailAddress: string;
    studentId: string;
    loginId: string;
    grade: number;
}

export default function AccountManagement({ name, emailAddress, studentId, loginId, grade }: Props) {
    const [isProfileUpdateModalOpen, setIsProfileUpdateModalOpen] = useState<boolean>(false);
    const [isPasswordUpdateModalOpen, setIsPasswordUpdateModalOpen] = useState<boolean>(false);
    const [isAccountWithdrawModalOpen, setIsAccountWithdrawModalOpen] = useState<boolean>(false);

    const handleModalCloseButtonClick = useCallback((target: string) => {
        switch (target) {
            case 'profileUpdateModal':
                setIsProfileUpdateModalOpen(false);
                break;

            case 'passwordUpdateModal':
                setIsPasswordUpdateModalOpen(false);
                break;

            case 'accountWithdrawModal':
                setIsAccountWithdrawModalOpen(false);
                break;
        }
    }, []);

    const modalClose = useCallback((target: string) => {
        switch (target) {
            case 'profileUpdateModal':
                setIsProfileUpdateModalOpen(false);
                break;

            case 'passwordUpdateModal':
                setIsPasswordUpdateModalOpen(false);
                break;

            case 'accountWithdrawModal':
                setIsAccountWithdrawModalOpen(false);
                break;
        }
    }, []);

    return (
        <>
            <div className={'flex flex-col gap-y-7 border-gray-200'}>
                <div className={'flex items-center gap-x-2.5 text-gray-500 duration-300 hover:text-green-400'}>
                    <TiSpanner className={'h-6 w-6'} />
                    <span
                        onClick={(): void => {
                            setIsProfileUpdateModalOpen(true);
                        }}
                        className={'cursor-pointer text-[0.97rem] font-semibold'}
                    >
                        개인 정보 수정
                    </span>
                </div>
                <div className={'flex items-center gap-x-2.5 text-gray-500 duration-300 hover:text-blue-400'}>
                    <MdOutlineManageAccounts className={'h-6 w-6'} />
                    <span
                        onClick={(): void => {
                            setIsPasswordUpdateModalOpen(true);
                        }}
                        className={'cursor-pointer text-[0.97rem] font-semibold'}
                    >
                        비밀번호 변경
                    </span>
                </div>
                <div className={'mb-7 flex items-center gap-x-2.5 text-gray-500 duration-300 hover:text-red-400'}>
                    <PiSignOut className={'h-6 w-6'} />
                    <span
                        onClick={(): void => {
                            setIsAccountWithdrawModalOpen(true);
                        }}
                        className={'cursor-pointer text-[0.97rem] font-semibold'}
                    >
                        계정 탈퇴
                    </span>
                </div>
            </div>
            <ProfileUpdateModal
                isModalOpen={isProfileUpdateModalOpen}
                onModalCloseButtonClick={(): void => {
                    handleModalCloseButtonClick('profileUpdateModal');
                }}
                modalClose={(): void => {
                    modalClose('profileUpdateModal');
                }}
                name={name}
                emailAddress={emailAddress}
                studentId={studentId}
                loginId={loginId}
                grade={grade}
            />
            <PasswordUpdateModal
                isModalOpen={isPasswordUpdateModalOpen}
                onModalCloseButtonClick={(): void => {
                    handleModalCloseButtonClick('passwordUpdateModal');
                }}
                modalClose={(): void => {
                    modalClose('passwordUpdateModal');
                }}
            />
        </>
    );
}
