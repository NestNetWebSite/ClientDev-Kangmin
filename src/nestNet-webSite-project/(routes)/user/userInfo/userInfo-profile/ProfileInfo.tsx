import { BsFillCreditCardFill } from 'react-icons/bs';
import { FaSchool } from 'react-icons/fa';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import ToManagerPageButton from './ToManagetPageButton';

interface Props {
    name: string;
    emailAddress: string;
    grade: number;
    memberAuthority: string;
    graduateYear: number | null;
}

const memberAuthorityInfo: { value: string; label: string }[] = [
    { value: 'GENERAL_MEMBER', label: '재학생' },
    { value: 'MANAGER', label: '관리자' },
    { value: 'GRADUATED_MEMBER', label: '졸업생' },
    { value: 'PRESIDENT', label: '회장' },
    { value: 'VICE_PRESIDENT', label: '부회장' },
    { value: 'WITHDRAWN_MEMBER', label: '탈퇴자' },
    { value: 'ON_LEAVE_MEMBER', label: '휴학생' },
];

export default function ProfileInfo({ name, emailAddress, grade, memberAuthority, graduateYear }: Props) {
    return (
        <>
            <div className={'flex flex-col gap-y-7'}>
                <div className={'flex items-center gap-x-2.5 text-gray-500'}>
                    <FiUser className={'h-6 w-6'} />
                    <span className={'text-[0.97rem] font-semibold'}>{name}</span>
                </div>
                <div className={'flex items-center gap-x-2.5 text-gray-500'}>
                    <MdOutlineEmail className={'h-6 w-6'} />
                    <div className={'flex-1 items-center overflow-x-scroll scrollbar-hide'}>
                        <span className={'text-[0.97rem] font-semibold'}>{emailAddress}</span>
                    </div>
                </div>
                <div className={'flex items-center gap-x-2.5 text-gray-500'}>
                    <FaSchool className={'h-6 w-6'} />
                    <span className={'text-[0.97rem] font-semibold'}>{grade}학년</span>
                </div>
                {memberAuthority === 'GRADUATED' && (
                    <div className={'flex items-center gap-x-2.5 text-gray-500'}>
                        <FiCalendar className={'h-6 w-6'} />
                        <span className={'text-[0.97rem] font-semibold'}>{graduateYear}년</span>
                    </div>
                )}
                <div className={'flex items-center gap-x-2.5 text-gray-500'}>
                    <BsFillCreditCardFill className={'h-6 w-6'} />
                    <span className={'text-[0.97rem] font-semibold'}>
                        {memberAuthorityInfo.find((element) => element.value === memberAuthority).label}
                    </span>
                </div>
                {memberAuthority === 'MANAGER' && <ToManagerPageButton />}
                <hr />
            </div>
        </>
    );
}
