import Avatar from './avatar/Avatar';
import ProfileInfo from './userInfo-profile/ProfileInfo';
import AccountManagement from './userInfo-account/AccountManagement';

interface Props {
    name: string;
    emailAddress: string;
    memberAuthority: string;
    grade: number;
    graduateYear: number | null;
    studentId: string;
    loginId: string;
}

export default function UserInfo({
    name,
    memberAuthority,
    emailAddress,
    grade,
    graduateYear,
    studentId,
    loginId,
}: Props) {
    console.log(name, memberAuthority, emailAddress, grade, graduateYear, studentId, loginId);
    return (
        <div className={'flex w-[15.5rem] flex-col rounded-3xl border border-gray-200 px-5 py-2 shadow-lg'}>
            <div className={'mx-auto'}>
                <Avatar name={name} memberAuthority={memberAuthority} />
            </div>
            <div className={'mx-1.5 mb-6 mt-7 w-full text-left text-[1.15rem] font-bold text-gray-700'}>개인 정보</div>
            <ProfileInfo
                name={name}
                emailAddress={emailAddress}
                grade={grade}
                memberAuthority={memberAuthority}
                graduateYear={graduateYear}
            />
            <div className={'mx-1.5 mb-6 mt-7 w-full text-left text-[1.15rem] font-bold text-gray-700'}>계정 관리</div>
            <AccountManagement
                name={name}
                emailAddress={emailAddress}
                studentId={studentId}
                loginId={loginId}
                grade={grade}
            />
        </div>
    );
}
